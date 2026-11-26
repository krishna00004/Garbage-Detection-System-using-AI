const PageHeader = ({ eyebrow, title, description, action }) => (
  <div className="mb-4 flex  flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
      ) : null}
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
      {description ? <p className="max-w-2xl text-slate-600 dark:text-slate-300">{description}</p> : null}
    </div>
    {action ? <div className="flex flex-wrap gap-3">{action}</div> : null}
  </div>
);

export default PageHeader;
