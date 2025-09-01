import { PreferenceArrayKeys } from "../preferences.type";
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
  return (
    <div className="mb-4" data-testid={`preference-item-list-${preferenceKey}`}>
      <div className="flex mb-2">
        <h3 className="flex items-center font-medium text-md">{title}</h3>
        <PreferencesItemListDialog
          title={title}
          preferenceKey={preferenceKey}
        />
      </div>

      <PreferenceList preferenceKey={preferenceKey} />
    </div>
  );
}
