import { useOutletContext } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import DetectionCard from '../components/detections/DetectionCard';
import { useDetections } from '../context/DetectionsContext';
import { useFilteredDetections } from '../hooks/useFilteredDetections';

const DeletedPage = () => {
  const { searchQuery } = useOutletContext();
  const { detections, loading, error, refetch } = useDetections();
  const deleted = useFilteredDetections(detections, searchQuery, (item) => item.isDeleted);

  if (loading) {
    return (
      <div className="page-container">
        <LoadingSpinner fullScreen label="Loading deleted detections..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <ErrorState title="Unable to load deleted records" message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="section-container">
        {deleted.length !== 0 && <PageHeader
          title="Deleted detections"
        />}

        {deleted.length === 0 ? (
          <EmptyState
            title="No deleted records"
            description="Deleted records will appear here once they are deleted."
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {deleted.map((item) => (
              <DetectionCard key={item.id} detection={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeletedPage;
