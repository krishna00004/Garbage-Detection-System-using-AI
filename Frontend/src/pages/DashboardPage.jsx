import { Activity, CheckCircle2, Clock3, RefreshCcw, Play, Square, Eye, EyeOff } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/StatCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import DetectionCard from '../components/detections/DetectionCard';
import { useDetections } from '../context/DetectionsContext';
import { useFilteredDetections } from '../hooks/useFilteredDetections';
import { apiService } from '../services/api';

const DashboardPage = () => {
  const { searchQuery } = useOutletContext();
  const { detections, analytics, loading, analyticsLoading, error, refetch } = useDetections();

  const [cameraRunning, setCameraRunning] = useState(false);
  const [showFeed, setShowFeed] = useState(true);
  const [cameraBusy, setCameraBusy] = useState(false);
  const [cameraError, setCameraError] = useState('');

  const activeDetections = useFilteredDetections(
    detections,
    searchQuery,
    (item) => !item.isDeleted
  ).slice(0, 6);

  const handleStartCamera = async () => {
    setCameraBusy(true);
    setCameraError('');
    try {
      await apiService.startCamera();
      setCameraRunning(true);
    } catch (err) {
      setCameraError(err?.response?.data?.error || err.message || 'Failed to start camera.');
    } finally {
      setCameraBusy(false);
    }
  };

  const handleStopCamera = async () => {
    setCameraBusy(true);
    setCameraError('');
    try {
      await apiService.stopCamera();
      setCameraRunning(false);
    } catch (err) {
      setCameraError(err?.response?.data?.error || err.message || 'Failed to stop camera.');
    } finally {
      setCameraBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <LoadingSpinner fullScreen label="Loading dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <ErrorState
          title="Unable to load dashboard"
          message={error}
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="section-container space-y-4">
        <PageHeader
          title="System Dashboard"
          action={
            <button type="button" onClick={refetch} className="btn-secondary">
              <RefreshCcw size={13} />
            </button>
          }
        />

        <section>
          <div className="card overflow-hidden">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Live Camera Control</h2>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleStartCamera}
                  disabled={cameraBusy || cameraRunning}
                  className="inline-flex items-center justify-center rounded-2xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Play size={16} className="mr-2" />
                  Start Camera
                </button>

                <button
                  type="button"
                  onClick={handleStopCamera}
                  disabled={cameraBusy || !cameraRunning}
                  className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Square size={16} className="mr-2" />
                  Stop Camera
                </button>

                <button
                  type="button"
                  onClick={() => setShowFeed((prev) => !prev)}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {showFeed ? <EyeOff size={16} className="mr-2" /> : <Eye size={16} className="mr-2" />}
                  {showFeed ? 'Hide Live Feed' : 'Show Live Feed'}
                </button>
              </div>
            </div>

            {cameraError ? (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-950 dark:bg-red-950/20 dark:text-red-300">
                {cameraError}
              </div>
            ) : null}

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <span
                className={`rounded-full px-3 py-1 font-medium ${
                  cameraRunning
                    ? 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-300'
                    : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {cameraRunning ? 'Camera Running' : 'Camera Stopped'}
              </span>

              <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700 dark:bg-blue-950/30 dark:text-blue-300">
                Detection continues while backend is active
              </span>
            </div>

            {showFeed && (
              <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 dark:border-slate-800">
                <img
                  src={apiService.getVideoFeedUrl()}
                  alt="Live camera feed"
                  className="block h-auto max-h-[50vh] w-full object-contain bg-black"
                />
              </div>
            )}
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="Total Overflow Garbage Detections"
            value={analyticsLoading ? '...' : analytics.total}
            icon={<Activity size={22} />}
          />
          <StatCard
            title="Work Pending -> Unclean"
            value={analyticsLoading ? '...' : analytics.pending}
            icon={<Clock3 size={22} />}
          />
          <StatCard
            title="Garbage Clean"
            value={analyticsLoading ? '...' : analytics.verified}
            icon={<CheckCircle2 size={22} />}
          />
        </div>

        <section>
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Recent Detections</h2>
            </div>
          </div>

          {activeDetections.length === 0 ? (
            <EmptyState
              title="No recent detections"
              description="New detection records will appear here once the system returns data."
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {activeDetections.map((detection) => (
                <DetectionCard key={detection.id} detection={detection} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;