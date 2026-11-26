import { AlertTriangle, RefreshCcw } from 'lucide-react';

const ErrorState = ({ title = 'Something went wrong', message, onRetry }) => (
  <div className="card flex flex-col items-start gap-4 border-red-200 bg-red-50/70 dark:border-red-950 dark:bg-red-950/20">
    <div className="flex items-center gap-3">
      <div className="rounded-2xl bg-red-100 p-3 text-red-600 dark:bg-red-950 dark:text-red-300">
        <AlertTriangle size={20} />
      </div>
      <div>
        <h3 className="font-semibold text-red-700 dark:text-red-300">{title}</h3>
        <p className="text-sm text-red-600/90 dark:text-red-200">{message}</p>
      </div>
    </div>
    {onRetry && (
      <button type="button" onClick={onRetry} className="btn-secondary">
        <RefreshCcw size={16} className="mr-2" />
        Try again
      </button>
    )}
  </div>
);

export default ErrorState;
