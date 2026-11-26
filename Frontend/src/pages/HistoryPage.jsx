import { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import DetectionTable from '../components/detections/DetectionTable';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import { useDetections } from '../context/DetectionsContext';
import { useFilteredDetections } from '../hooks/useFilteredDetections';

const HistoryPage = () => {
  const { searchQuery } = useOutletContext();
  const { detections, loading, error, refetch, verifyDetection, deleteDetection } = useDetections();

  const [busyId, setBusyId] = useState('');
  const [actionError, setActionError] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredBySearch = useFilteredDetections(detections, searchQuery, (item) => !item.isDeleted);

  const filtered = useMemo(() => {
    if (statusFilter === 'ALL') return filteredBySearch;
    return filteredBySearch.filter((item) => item.status === statusFilter);
  }, [filteredBySearch, statusFilter]);

  const handleVerify = async (id) => {
    setBusyId(id);
    setActionError('');

    try {
      await verifyDetection(id);
    } catch (err) {
      setActionError(err.message || 'Failed to verify detection.');
    } finally {
      setBusyId('');
    }
  };

  const handleDelete = async (id) => {
    setBusyId(id);
    setActionError('');

    try {
      await deleteDetection(id);
    } catch (err) {
      setActionError(err.message || 'Failed to delete detection.');
    } finally {
      setBusyId('');
    }
  };

  const handleDownloadCSV = () => {
    if (!filtered.length) return;

    const rows = filtered.map((item) => ({
      location: item.location || '',
      fill_percentage: item.fillPercentage ?? '',
      status: item.status || '',
      created_at: item.createdAt || '',
      image_url: item.imageUrl || ''
    }));

    const headers = Object.keys(rows[0]);
    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        headers
          .map((header) => `"${String(row[header] ?? '').replace(/"/g, '""')}"`)
          .join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'detection-history.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="page-container">
        <LoadingSpinner fullScreen label="Loading detection history..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <ErrorState title="Unable to load history" message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="section-container">
        <PageHeader
          title="Detection history"
        />

        {actionError ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-950 dark:bg-red-950/20 dark:text-red-300">
            {actionError}
          </div>
        ) : null}

        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-green-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="VERIFIED">Verified</option>
              <option value="DELETED">Deleted</option>
            </select>

            <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              Total: <span className="font-semibold">{filtered.length}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDownloadCSV}
            disabled={!filtered.length}
            className="inline-flex items-center justify-center rounded-2xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Download CSV
          </button>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No detections found" description="Try adjusting your search or check back later." />
        ) : (
          <DetectionTable
            detections={filtered}
            onVerify={handleVerify}
            onDelete={handleDelete}
            busyId={busyId}
          />
        )}
      </div>
    </div>
  );
};

export default HistoryPage;