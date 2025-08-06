import { useRemovePreferenceItem } from "../mutation/use-remove-preferences.mutation";
import { PreferenceItem } from "./preferences-item";

interface PreferenceListProps {
  items: string[];
  handleRemoveItem: (item: string) => void;
  removeItemMutation: ReturnType<typeof useRemovePreferenceItem>;
}

export function PreferenceList({
  items,
  handleRemoveItem,
  removeItemMutation,
}: PreferenceListProps) {
  return (
    <div className="flex  flex-wrap gap-2">
      {items.length > 0 ? (
        items.map((item, index) => (
          <PreferenceItem
            key={index}
            item={item}
            index={index}
            handleRemoveItem={handleRemoveItem}
            removeItemMutation={removeItemMutation}
          />
        ))
      ) : (
        <p className="text-gray-500">None specified</p>
      )}
    </div>
  );
}
