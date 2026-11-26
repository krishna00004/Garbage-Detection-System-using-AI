import { BellRing, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import { relativeTimeFromNow } from '../utils/date';
import { apiService } from '../services/api';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      const data = await apiService.getNotifications();
      setNotifications(data);
    } catch (err) {
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Auto Refresh
  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Mark as read on open
  useEffect(() => {
    apiService.markNotificationsRead();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <LoadingSpinner fullScreen label="Loading notifications..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <ErrorState title="Unable to load notifications" message={error} onRetry={fetchNotifications} />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="section-container">
        <PageHeader
          title="Notifications"
        />

        {notifications.length === 0 ? (
          <EmptyState title="No alerts right now" description="Everything looks clean." />
        ) : (
          <div className="space-y-4">
            {notifications.map((n) => (
              <article key={n._id} className="card flex items-start gap-4">
                <div className="rounded-2xl bg-red-100 p-3 text-red-500 dark:bg-red-900">
                  <BellRing size={22} />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">{n.message}</h3>
                    <span className="text-sm text-gray-500">
                      {relativeTimeFromNow(n.created_at)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    Location: {n.location}
                  </p>

                  {!n.read && (
                    <span className="text-xs text-red-500 font-semibold">
                      NEW
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 rounded-3xl border border-green-200 bg-green-50 p-5 text-sm text-green-700">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} />
            <p>Notifications are now powered by backend MongoDB.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;