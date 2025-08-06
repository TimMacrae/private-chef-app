import { Badge } from "@/components/ui/badge";
import { useRemovePreferenceItem } from "../mutation/use-remove-preferences.mutation";
import { PlusIcon } from "lucide-react";

interface PreferenceItemProps {
  item: string;
  index: number;
  handleRemoveItem: (item: string) => void;
  removeItemMutation: ReturnType<typeof useRemovePreferenceItem>;
}

export function PreferenceItem({
  item,
  index,
  handleRemoveItem,
  removeItemMutation,
}: PreferenceItemProps) {
  return (
    <Badge
      key={index}
      variant="secondary"
      className="bg-secondary text-sidebar-foreground flex items-center gap-2"
    >
      {item}
      <button
        className="cursor-pointer text-sidebar-foreground hover:text-destructive"
        onClick={() => handleRemoveItem(item)}
        disabled={removeItemMutation.isPending}
      >
        <PlusIcon className="h-3 w-3 rotate-45" />
      </button>
    </Badge>
  );
}
