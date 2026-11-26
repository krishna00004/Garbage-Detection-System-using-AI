import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { apiService } from '../services/api';
import { normalizeAnalytics } from '../utils/apiHelpers';
import { usePreferences } from './PreferencesContext';

const DetectionsContext = createContext(null);

export const DetectionsProvider = ({ children }) => {
  const { preferences } = usePreferences();
  const [detections, setDetections] = useState([]);
  const [analytics, setAnalytics] = useState({ total: 0, pending: 0, verified: 0 });
  const [loading, setLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [error, setError] = useState('');

  const refreshAnalytics = useCallback(async (currentDetections) => {
    setAnalyticsLoading(true);
    try {
      const nextAnalytics = await apiService.getAnalytics(currentDetections);
      setAnalytics(nextAnalytics);
    } catch {
      setAnalytics(normalizeAnalytics({}, currentDetections));
    } finally {
      setAnalyticsLoading(false);
    }
  }, []);

  const fetchDetections = useCallback(async () => {
    setError('');
    try {
      const items = await apiService.getDetections();
      setDetections(items);
      await refreshAnalytics(items);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to fetch detections.');
    } finally {
      setLoading(false);
    }
  }, [refreshAnalytics]);

  useEffect(() => {
    fetchDetections();
  }, [fetchDetections]);

  useEffect(() => {
    if (!preferences?.autoRefresh) return undefined;

    const interval = window.setInterval(() => {
      fetchDetections();
    }, 5000);

    return () => window.clearInterval(interval);
  }, [fetchDetections, preferences?.autoRefresh]);

  const verifyDetection = async (id) => {
    try {
      await apiService.verifyDetection(id);
      await fetchDetections();
    } catch (err) {
      throw new Error(err?.response?.data?.message || err.message || 'Unable to verify detection.');
    }
  };

  const deleteDetection = async (id) => {
    try {
      await apiService.deleteDetection(id);
      await fetchDetections();
    } catch (err) {
      throw new Error(err?.response?.data?.message || err.message || 'Unable to delete detection.');
    }
  };

  const value = useMemo(
    () => ({
      detections,
      analytics,
      loading,
      analyticsLoading,
      error,
      refetch: fetchDetections,
      verifyDetection,
      deleteDetection
    }),
    [analytics, analyticsLoading, detections, error, fetchDetections, loading]
  );

  return <DetectionsContext.Provider value={value}>{children}</DetectionsContext.Provider>;
};

export const useDetections = () => useContext(DetectionsContext);