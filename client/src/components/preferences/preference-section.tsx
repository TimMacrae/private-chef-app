interface PreferenceSectionProps {
  title: string;
  children: React.ReactNode;
  dataTestId: string;
}
export const PreferenceSection = ({
  title,
  children,
  dataTestId,
}: PreferenceSectionProps) => {
  return (
    <div className="mt-4" data-testid={dataTestId}>
      <h2
        className="text-lg font-semibold mb-4"
        data-testid={`${dataTestId}-title`}
      >
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
};
