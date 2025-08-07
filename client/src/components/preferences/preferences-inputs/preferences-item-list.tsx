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
    <div>
      <div className="flex justify-between align-middle mb-2">
        <h3 className="font-medium">{title}</h3>
        <PreferencesItemListDialog
          title={title}
          preferenceKey={preferenceKey}
        />
      </div>

      <PreferenceList preferenceKey={preferenceKey} />
    </div>
  );
}
