export const LoadingSpinner = () => {
  return (
    <div
      className="flex justify-center items-center p-8"
      data-testid="loading-container"
    >
      <div className="text-lg">Loading...</div>
    </div>
  );
};
