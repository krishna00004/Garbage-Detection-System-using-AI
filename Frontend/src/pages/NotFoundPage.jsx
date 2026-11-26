import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="page-container flex min-h-screen items-center justify-center">
    <div className="card max-w-lg text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">404</p>
      <h1 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">Page not found</h1>
      <p className="mt-4 text-slate-500 dark:text-slate-300">
        The page you requested does not exist or may have been moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link to="/" className="btn-primary">
          Go Home
        </Link>
        <Link to="/dashboard" className="btn-secondary">
          Dashboard
        </Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
