import { Inbox } from 'lucide-react';

const EmptyState = ({ title = 'No data found', description = 'There is nothing to display right now.' }) => (
  <div className="card flex flex-col items-center justify-center gap-4 py-12 text-center">
    <div className="rounded-full bg-brand-light p-4 text-brand dark:bg-green-950 dark:text-green-300">
      <Inbox size={28} />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-300">{description}</p>
    </div>
  </div>
);

export default EmptyState;
