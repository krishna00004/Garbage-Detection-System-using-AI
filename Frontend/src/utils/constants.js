export const APP_NAME = 'AI-Powered Garbage Detection System';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000';

export const STATUS_COLORS = {
  PENDING: 'bg-red-100 text-red-700 ring-red-200 dark:bg-red-950/50 dark:text-red-300 dark:ring-red-900',
  VERIFIED: 'bg-green-100 text-green-700 ring-green-200 dark:bg-green-950/50 dark:text-green-300 dark:ring-green-900',
  DELETED: 'bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700'
};

export const SIDEBAR_LINKS = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'History', path: '/history' },
  { label: 'Analysis', path: '/analysis' },
  { label: 'Notifications', path: '/notifications' },
  { label: 'Verified', path: '/verified' },
  { label: 'Deleted', path: '/deleted' },
  { label: 'Profile', path: '/profile' },
  { label: 'Settings', path: '/settings' }
];
