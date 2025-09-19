"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useInviteCollaborator } from "./mutation/use-invite-collaborator.mutation";

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export function CollaborationForm() {
  const { mutate: inviteCollaborator } = useInviteCollaborator();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    inviteCollaborator(data);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="md:w-[400px] sm:w-full space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormDescription className="text-xs text-muted-foreground hidden sm:block">
                Invite a collaborator to your account by entering their email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Invite</Button>
      </form>
    </Form>
  );
}
