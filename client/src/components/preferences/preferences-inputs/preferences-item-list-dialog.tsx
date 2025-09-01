import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { useAddPreferenceItem } from "../mutation/use-add-preferences.mutation";
import { useQueryClient } from "@tanstack/react-query";
import { apiConfig } from "@/lib/api/api-config";
import { toast } from "sonner";
import { PreferenceArrayKeys, Preferences } from "../preferences.type";

interface PreferencesItemListDialogProps {
  title: string;
  preferenceKey: keyof PreferenceArrayKeys;
}

export function PreferencesItemListDialog({
  preferenceKey,
  title,
}: PreferencesItemListDialogProps) {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState("");

  const addItemMutation = useAddPreferenceItem();

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

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
      data-testid={`preference-item-list-dialog-${preferenceKey}-button`}
    >
      <DialogTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className="hover:none text-sidebar-foreground cursor-pointer gap-0 ml-1"
          disabled={addItemMutation.isPending}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex align-middle">Add {title}</DialogTitle>
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
              <Button variant="outline" disabled={addItemMutation.isPending}>
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
  );
}
