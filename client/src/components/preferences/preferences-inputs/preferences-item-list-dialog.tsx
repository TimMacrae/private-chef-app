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
import React from "react";
import { useAddPreferenceItem } from "../mutation/use-add-preferences.mutation";

interface PreferencesItemListDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  title: string;
  addItemMutation: ReturnType<typeof useAddPreferenceItem>;
  newItem: string;
  setNewItem: (item: string) => void;
  handleAddItem: (e: React.FormEvent) => void;
}

export function PreferencesItemListDialog({
  isDialogOpen,
  setIsDialogOpen,
  title,
  addItemMutation,
  newItem,
  setNewItem,
  handleAddItem,
}: PreferencesItemListDialogProps) {
  return (
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
