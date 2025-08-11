interface PreferenceSectionProps {
  title: string;
  children: React.ReactNode;
}
export const PreferenceSection = ({
  title,
  children,
}: PreferenceSectionProps) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
};
