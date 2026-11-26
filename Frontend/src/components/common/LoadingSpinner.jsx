const LoadingSpinner = ({ label = 'Loading...', fullScreen = false }) => {
  const content = (
    <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-300">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand border-r-transparent" />
      <span>{label}</span>
    </div>
  );

  if (fullScreen) {
    return <div className="flex min-h-[40vh] items-center justify-center">{content}</div>;
  }

  return content;
};

export default LoadingSpinner;
