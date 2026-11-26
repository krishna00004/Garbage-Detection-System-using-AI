const FillBar = ({ percentage = 0 }) => {
  const safePercentage = Math.max(0, Math.min(100, Number(percentage) || 0));
  const tone =
    safePercentage >= 80 ? 'bg-red-500' : safePercentage >= 50 ? 'bg-amber-500' : 'bg-brand';

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
        <span>Fill level</span>
        <span>{safePercentage.toFixed(0)}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-800">
        <div className={`h-2.5 rounded-full ${tone}`} style={{ width: `${safePercentage}%` }} />
      </div>
    </div>
  );
};

export default FillBar;
