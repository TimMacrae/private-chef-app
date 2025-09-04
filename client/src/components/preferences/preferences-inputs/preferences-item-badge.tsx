import { Badge } from "@/components/ui/badge";
import { useRemovePreferenceItem } from "../mutation/use-remove-preferences.mutation";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

interface PreferenceItemProps {
  item: string;
  index: number;
  handleRemoveItem: (item: string) => void;
  removeItemMutation: ReturnType<typeof useRemovePreferenceItem>;
}

export function PreferenceItemBadge({
  item,
  index,
  handleRemoveItem,
  removeItemMutation,
}: PreferenceItemProps) {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  return (
    <Badge
      key={index}
      variant="secondary"
      className={`bg-primary text-white flex items-center gap-2 ${
        isButtonHovered ? "bg-primary/80 " : "bg-primary"
      } transition-colors duration-200`}
      data-testid={`preference-item-badge-${index}`}
    >
      {item}
      <button
        className="cursor-pointer text-white hover:scale-125 transition-transform duration-200"
        onClick={() => handleRemoveItem(item)}
        disabled={removeItemMutation.isPending}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        data-testid={`preference-item-badge-remove-item-${index}`}
      >
        <PlusIcon className="h-3 w-3 rotate-45" />
      </button>
    </Badge>
  );
}
