import { ColumnDef } from "@tanstack/react-table";
import { Recipe } from "../recipes/recipes.type";
import { Badge } from "../ui/badge";

export const columns: ColumnDef<Recipe>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="max-w-[400px] truncate mx-auto text-left">
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "mealType",
    header: "Meal Type",
    cell: ({ row }) => (
      <Badge className="bg-accent text-accent-foreground capitalize">
        {String(row.getValue("mealType")).toLowerCase()}
      </Badge>
    ),
  },
  {
    accessorKey: "cuisine",
    header: "Cuisine",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue("cuisine")}
      </Badge>
    ),
  },
  {
    accessorKey: "cookingSkillLevel",
    header: "Skill Level",
    cell: ({ row }) => (
      <Badge className="bg-accent text-accent-foreground capitalize">
        {String(row.getValue("cookingSkillLevel")).toLowerCase()}
      </Badge>
    ),
  },
  {
    accessorKey: "budgetLevel",
    header: "Budget",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {String(row.getValue("budgetLevel")).toLowerCase()}
      </Badge>
    ),
  },
  {
    accessorKey: "prepTimeMinutes",
    header: "Prep Time",
    cell: ({ row }) => <div>{row.getValue("prepTimeMinutes")} min</div>,
  },
  {
    accessorKey: "servings",
    header: "Servings",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => <div>{row.original.createdAt.toLocaleDateString()}</div>,
  },
];
