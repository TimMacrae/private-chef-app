import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { type Recipe } from "./recipes.type";
import {
  Clock,
  Users,
  ChefHat,
  DollarSign,
  BarChart,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import BackgroundImage1 from "../../../public/269DC9E1-B446-421A-861B-6A6ECEA63E0E.png";
import BackgroundImage2 from "../../../public/A7532A20-1A6C-42F6-881C-90E3CAB68D34.png";
import BackgroundImage3 from "../../../public/C3DE6D78-E808-4029-AF07-BD2E0478B6C4.png";
import BackgroundImage4 from "../../../public/740B8F27-5876-4BD8-BE0F-75BFF295B875.png";
import BackgroundImage5 from "../../../public/B522BD92-C5D0-4789-A32E-9CE32CA83179.png";
import BackgroundImage6 from "../../../public/F648448D-0E93-4EDB-8E12-FB617D895867.png";
import BackgroundImage7 from "../../../public/0FBD376F-7EB1-4A27-9F1C-5C9A6C82F829.png";
import { useMemo } from "react";

interface RecipeProps {
  recipe: Recipe;
}

const backgroundImages = [
  BackgroundImage1,
  BackgroundImage2,
  BackgroundImage3,
  BackgroundImage4,
  BackgroundImage5,
  BackgroundImage6,
  BackgroundImage7,
];

export function Recipe({ recipe }: RecipeProps) {
  const randomBackgroundImage = useMemo(
    () => backgroundImages[Math.floor(Math.random() * backgroundImages.length)],
    []
  );

  return (
    <Card className="w-full max-w-3xl mx-auto my-4 pt-0">
      <CardHeader className="px-0">
        {recipe.image ? (
          <Image
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-t-lg mb-4"
          />
        ) : (
          <div className="w-full h-64 relative rounded-t-lg mb-4 overflow-hidden bg-accent flex items-center justify-center">
            <Image
              src={randomBackgroundImage}
              alt="Background"
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <CardTitle className="text-3xl font-bold px-6">
          {recipe.title}
        </CardTitle>
        <CardDescription className="pt-2 px-6">
          {recipe.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2 pt-4 px-6">
          <Badge variant="secondary" className="bg-accent">
            <Clock className="mr-1 h-3 w-3" /> {recipe.prepTimeMinutes} min
          </Badge>
          <Badge variant="secondary" className="bg-accent">
            <Users className="mr-1 h-3 w-3" /> {recipe.servings} servings
          </Badge>
          <Badge variant="secondary" className="capitalize bg-accent">
            <ChefHat className="mr-1 h-3 w-3" />
            {recipe.cookingSkillLevel.toLowerCase()}
          </Badge>
          <Badge variant="secondary" className="capitalize bg-accent">
            <DollarSign className="mr-1 h-3 w-3" />
            {recipe.budgetLevel.toLowerCase()}
          </Badge>
          <Badge variant="secondary" className="capitalize bg-accent">
            <BarChart className="mr-1 h-3 w-3" />
            {recipe.mealType.toLowerCase()}
          </Badge>
          <Badge variant="secondary" className="capitalize bg-accent">
            <Utensils className="mr-1 h-3 w-3" />
            {recipe.cuisine}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="ingredients">
          <AccordionItem value="ingredients">
            <AccordionTrigger className="text-xl font-semibold">
              Ingredients
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-5 space-y-1">
                {Object.entries(recipe.ingredients).map(([name, amount]) => (
                  <li key={name}>
                    <span className="font-semibold">{name}:</span> {amount}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="instructions">
            <AccordionTrigger className="text-xl font-semibold">
              Instructions
            </AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal pl-5 space-y-2">
                {recipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Created on: {recipe.createdAt.toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
}
