import { useQueryClient } from "@tanstack/react-query";
import { Preferences, PreferenceSingleValueKeys } from "../preferences.type";
import { apiConfig } from "@/lib/api/api-config";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

import { useUpdatePreferences } from "../mutation/use-update-preferences.mutation";
import { preferenceItemSelectOptions } from "./preferences-item-select-options";

interface PreferencesItemSelectProps {
  title: string;
  preferenceKey: keyof PreferenceSingleValueKeys;
}

export function PreferencesItemSelect({
  preferenceKey,
  title,
}: PreferencesItemSelectProps) {
  const queryClient = useQueryClient();
  const updateMutation = useUpdatePreferences();
  const options = preferenceItemSelectOptions(preferenceKey);

  const currentData = queryClient.getQueryData<Preferences>([
    apiConfig.QUERY_KEYS.PREFERENCES,
  ]);
  const currentValue = currentData?.[preferenceKey];

  const handleValueChange = async (value: string) => {
    if (!value.trim()) return;

    if (!currentData) {
      toast.error("No preferences data available");
      return;
    }

    let processedValue: string | number;
    if (preferenceKey === "maxPrepTimeMinutes") {
      processedValue = parseInt(value);
    } else {
      processedValue = value.trim();
    }

    await updateMutation.mutateAsync({
      field: preferenceKey,
      value: processedValue,
      originalData: currentData,
    });
  };

  return (
    <div>
      <label htmlFor={preferenceKey}>{title}</label>
      <Select
        onValueChange={handleValueChange}
        value={currentValue ? String(currentValue) : ""}
        defaultValue={currentValue ? String(currentValue) : ""}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder={`Select ${title.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{title}</SelectLabel>
            {options.map((option) => (
              <SelectItem
                key={String(option.value)}
                value={String(option.value)}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
