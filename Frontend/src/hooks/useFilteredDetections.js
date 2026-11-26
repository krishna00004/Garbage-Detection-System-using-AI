import { useMemo } from 'react';

export const useFilteredDetections = (detections, searchQuery, predicate = () => true) =>
  useMemo(() => {
    const query = searchQuery?.trim().toLowerCase() || '';
    return detections.filter((item) => {
      const matchesPredicate = predicate(item);
      if (!matchesPredicate) return false;
      if (!query) return true;
      return (
        item.location.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query) ||
        String(item.fillPercentage).includes(query)
      );
    });
  }, [detections, predicate, searchQuery]);
