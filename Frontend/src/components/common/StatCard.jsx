const StatCard = ({ title, value, description, icon }) => (
  <div className="card">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-300">{title}</p>
        <h3 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white text-center">{value}</h3>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">{description}</p>
      </div>
      <div className="rounded-md bg-brand-light p-3 mt-2 text-brand dark:bg-green-950 dark:text-green-300">{icon}</div>
    </div>
  </div>
);

export default StatCard;
