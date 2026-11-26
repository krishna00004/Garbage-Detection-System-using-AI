import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import StatusBarChart from '../components/charts/StatusBarChart';
import StatusPieChart from '../components/charts/StatusPieChart';
import { useDetections } from '../context/DetectionsContext';
import { useFilteredDetections } from '../hooks/useFilteredDetections';

const AnalysisPage = () => {
  const { searchQuery } = useOutletContext();
  const { detections, loading, error, refetch } = useDetections();
  const filtered = useFilteredDetections(detections, searchQuery, (item) => !item.isDeleted);

  const barData = useMemo(() => {
    const map = filtered.reduce((acc, item) => {
      acc[item.location] = (acc[item.location] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(map).map(([name, count]) => ({ name, count }));
  }, [filtered]);

  const pieData = useMemo(() => {
    const counts = filtered.reduce(
      (acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      },
      { VERIFIED: 0, PENDING: 0 }
    );

    return [
      { name: 'Clean', value: counts.VERIFIED || 0 },
      { name: 'Unclean', value: counts.PENDING || 0 }
    ];
  }, [filtered]);

  if (loading) {
    return (
      <div className="page-container">
        <LoadingSpinner fullScreen label="Preparing analytics..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <ErrorState title="Unable to load analytics" message={error} onRetry={refetch} />
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="page-container">
        <EmptyState title="No analytics available" description="Detection analytics will appear once records are available." />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="section-container">
        <PageHeader
          title="Detection analysis"
        />

        <div className="grid gap-4 xl:grid-cols-2 xl:gap-6">
          <StatusBarChart data={barData} />
          <StatusPieChart data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
