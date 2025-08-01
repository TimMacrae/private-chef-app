import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import { usePreferences } from "@/hooks/query/use-preferences.query";
import { PreferenceArrayKeys, Preferences } from "./preferences.type";
import { toast } from "sonner";
import { useState } from "react";
import { useAddPreferenceItem } from "./mutation/use-add-preferences.mutation";
import { useRemovePreferenceItem } from "./mutation/use-remove-preferences.mutation";
import { apiConfig } from "@/lib/api/api-config";
import { useQueryClient } from "@tanstack/react-query";

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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="link"
              size="sm"
              className="hover:none text-sidebar-foreground cursor-pointer gap-0"
              disabled={addItemMutation.isPending}
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Add
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex align-middle">
                Add {title}
              </DialogTitle>
              <DialogDescription>
                Add a new item to your {title.toLowerCase()}.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddItem}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Item</Label>
                  <Input
                    id="item-input"
                    name="item"
                    placeholder={`Enter ${title.toLowerCase().slice(0, -1)}`}
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    disabled={addItemMutation.isPending}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    disabled={addItemMutation.isPending}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={addItemMutation.isPending || !newItem.trim()}
                >
                  {addItemMutation.isPending ? "Adding..." : "Add Item"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <PreferenceList
        items={items}
        handleRemoveItem={handleRemoveItem}
        removeItemMutation={removeItemMutation}
      />
    </div>
  );
}

interface PreferenceListProps {
  items: string[];
  handleRemoveItem: (item: string) => void;
  removeItemMutation: ReturnType<typeof useRemovePreferenceItem>;
}

function PreferenceList({
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

interface PreferenceItemProps {
  item: string;
  index: number;
  handleRemoveItem: (item: string) => void;
  removeItemMutation: ReturnType<typeof useRemovePreferenceItem>;
}

function PreferenceItem({
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
