import { useQueryClient } from "@tanstack/react-query";
import {
  Preferences,
  PreferenceSeasonalKey,
  PreferenceSeasonalSubKey,
} from "../preferences.type";
import { apiConfig } from "@/lib/api/api-config";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useUpdatePreferences } from "../mutation/use-update-preferences.mutation";

interface PreferencesItemCheckboxProps {
  title: string;
  preferenceKey: keyof PreferenceSeasonalKey;
  preferenceSubKey: keyof PreferenceSeasonalSubKey;
}

export function PreferencesItemCheckbox({
  preferenceKey,
  preferenceSubKey,
  title,
}: PreferencesItemCheckboxProps) {
  const queryClient = useQueryClient();
  const updateMutation = useUpdatePreferences();

  const currentData = queryClient.getQueryData<Preferences>([
    apiConfig.QUERY_KEYS.PREFERENCES,
  ]);

  // Handle nested object access
  const getCurrentValue = () => {
    if (!currentData) return false;

    if (preferenceSubKey) {
      return currentData[preferenceKey][preferenceSubKey];
    }

    return currentData[preferenceKey];
  };
  const currentValue = getCurrentValue();

  const handleCheckedChange = async (checked: boolean) => {
    if (!currentData) {
      toast.error("No preferences data available");
      return;
    }

    // Update the current value based on the checkbox state
    const seasonalPreferences = currentData[preferenceKey];
    const newSeasonalPreferences = {
      ...seasonalPreferences,
      [preferenceSubKey]: checked,
    };

    await updateMutation.mutateAsync({
      field: preferenceKey,
      value: newSeasonalPreferences,
      originalData: currentData,
    });
  };

  return (
    <div
      data-testid={`preferences-item-checkbox-${preferenceKey}-${preferenceSubKey}`}
    >
      <div className="flex items-center space-x-2">
        <Checkbox
          id={preferenceKey}
          data-testid="preferences-item-checkbox-button"
          checked={Boolean(currentValue)}
          onCheckedChange={handleCheckedChange}
          disabled={updateMutation.isPending}
        />
        <label
          htmlFor={preferenceKey}
          className="font-medium text-md cursor-pointer"
        >
          {title}
        </label>
      </div>
    </div>
  );
}
