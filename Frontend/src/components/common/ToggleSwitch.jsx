const ToggleSwitch = ({ checked, onChange, label, description }) => (
  <div className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
    <div>
      <p className="font-medium text-slate-900 dark:text-white">{label}</p>
      {description ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{description}</p> : null}
    </div>
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
        checked ? 'bg-brand' : 'bg-slate-300 dark:bg-slate-700'
      }`}
      aria-pressed={checked}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

export default ToggleSwitch;
