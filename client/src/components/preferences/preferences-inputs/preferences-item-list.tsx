import { usePreferences } from "@/hooks/query/use-preferences.query";
import { PreferenceArrayKeys, Preferences } from "../preferences.type";
import { toast } from "sonner";
import { useState } from "react";
import { useAddPreferenceItem } from "../mutation/use-add-preferences.mutation";
import { useRemovePreferenceItem } from "../mutation/use-remove-preferences.mutation";
import { apiConfig } from "@/lib/api/api-config";
import { useQueryClient } from "@tanstack/react-query";
import { PreferenceList } from "./preferences-list";
import { PreferencesItemListDialog } from "./preferences-item-list-dialog";

interface PreferenceCardProps {
  title: string;
  preferenceKey: keyof PreferenceArrayKeys;
}

export function PreferenceItemList({
  title,
  preferenceKey,
}: PreferenceCardProps) {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState("");

  const { data, isPending } = usePreferences();
  const addItemMutation = useAddPreferenceItem();
  const removeItemMutation = useRemovePreferenceItem();

  if (isPending) {
    return <div className="text-gray-500">Loading...</div>;
  }

  const items = data?.[preferenceKey] || [];

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    const currentData = queryClient.getQueryData<Preferences>([
      apiConfig.QUERY_KEYS.PREFERENCES,
    ]);

    if (!currentData) {
      toast.error("No preferences data available");
      return;
    }

    await addItemMutation.mutateAsync({
      field: preferenceKey,
      item: newItem.trim().toLowerCase(),
      originalData: currentData,
    });

    setNewItem("");
    setIsDialogOpen(false);
  };

  const handleRemoveItem = async (item: string) => {
    await removeItemMutation.mutateAsync({
      field: preferenceKey,
      item,
    });
  };

  return (
    <div>
      <div className="flex justify-between align-middle mb-2">
        <h3 className="font-medium">{title}</h3>
        <PreferencesItemListDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          title={title}
          addItemMutation={addItemMutation}
          newItem={newItem}
          setNewItem={setNewItem}
          handleAddItem={handleAddItem}
        />
      </div>

      <PreferenceList
        items={items}
        handleRemoveItem={handleRemoveItem}
        removeItemMutation={removeItemMutation}
      />
    </div>
  );
}
