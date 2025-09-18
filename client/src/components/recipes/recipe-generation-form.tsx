import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MealTypeSchema, RecipeGenerateRequestSchema } from "./recipes.type";

type RecipeGenerationFormProps = {
  generateRecipe: (data: z.infer<typeof FormSchema>) => void;
  isPending: boolean;
};

const FormSchema = RecipeGenerateRequestSchema.extend({
  instructions: z.string(),
  servings: z.coerce
    .number({ required_error: "Please enter a number of servings." })
    .min(1, { message: "Must be at least 1 serving." }),
  mealType: MealTypeSchema.refine((val) => val !== undefined, {
    message: "Please select a meal type.",
  }),
});

export function RecipeGenerationForm({
  generateRecipe,
  isPending,
}: RecipeGenerationFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      instructions: "",
      servings: 1,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    generateRecipe(data);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-start gap-4  md:w-full"
      >
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input
                  placeholder="instructions, a mushroom pasta"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mealType"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a meal type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MealTypeSchema.options.map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type.toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="servings"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Servings"
                  className="w-28"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Generating..." : "Generate"}
        </Button>
      </form>
    </Form>
  );
}
