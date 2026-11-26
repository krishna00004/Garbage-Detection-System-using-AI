import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { storage } from '../utils/storage';

const PreferencesContext = createContext(null);

const STORAGE_KEY = 'garbage-detection-preferences';

const defaultPreferences = {
  theme: 'light',
  notifications: true,
  autoRefresh: true,
  compactCards: false,
  showDeletedOnHistory: false
};

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(() => {
    const saved = storage.get(STORAGE_KEY, defaultPreferences);
    return { ...defaultPreferences, ...saved };
  });

  useEffect(() => {
    storage.set(STORAGE_KEY, preferences);
  }, [preferences]);

  useEffect(() => {
    const root = document.documentElement;
    if (preferences.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [preferences.theme]);

  const updatePreference = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const togglePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const resetPreferences = () => {
    setPreferences({ ...defaultPreferences });
  };

  const value = useMemo(
    () => ({
      preferences,
      updatePreference,
      togglePreference,
      resetPreferences
    }),
    [preferences]
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => useContext(PreferencesContext);