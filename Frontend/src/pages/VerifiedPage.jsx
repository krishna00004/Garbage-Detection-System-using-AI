import { useOutletContext } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import DetectionCard from '../components/detections/DetectionCard';
import { useDetections } from '../context/DetectionsContext';
import { useFilteredDetections } from '../hooks/useFilteredDetections';

const VerifiedPage = () => {
  const { searchQuery } = useOutletContext();
  const { detections, loading, error, refetch } = useDetections();
  const verified = useFilteredDetections(
    detections,
    searchQuery,
    (item) => item.status === 'VERIFIED' && !item.isDeleted
  );

  if (loading) {
    return (
      <div className="page-container">
        <LoadingSpinner fullScreen label="Loading verified detections..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <ErrorState title="Unable to load verified records" message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="page-container">
       <div className="section-container">
        {verified.length!==0 && <PageHeader
          title="Clean Garbage Area -> Confirmed by Admin"
        />}

        {verified.length === 0 ? (
         
           <EmptyState title="Area is being cleaned" description="Verified records will appear here once they  are confirmed." />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {verified.map((item) => (
              <DetectionCard key={item.id} detection={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifiedPage;
