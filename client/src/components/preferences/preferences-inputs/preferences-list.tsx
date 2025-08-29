import { usePreferences } from "@/hooks/query/use-preferences.query";
import { useRemovePreferenceItem } from "../mutation/use-remove-preferences.mutation";
import { PreferenceArrayKeys } from "../preferences.type";
import { PreferenceItemBadge } from "./preferences-item-badge";

interface PreferenceListProps {
  preferenceKey: keyof PreferenceArrayKeys;
}

export function PreferenceList({ preferenceKey }: PreferenceListProps) {
  const removeItemMutation = useRemovePreferenceItem();
  const { data, isPending } = usePreferences();

  if (isPending) {
    return <div className="text-gray-500">Loading...</div>;
  }

  const items = data?.[preferenceKey as keyof PreferenceArrayKeys] || [];

  const handleRemoveItem = async (item: string) => {
    await removeItemMutation.mutateAsync({
      field: preferenceKey,
      item,
    });
  };

  return (
    <div className="flex  flex-wrap gap-2">
      {items.length > 0 ? (
        items.map((item, index) => (
          <PreferenceItemBadge
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
