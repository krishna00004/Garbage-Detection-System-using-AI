import PageHeader from '../components/common/PageHeader';
import ToggleSwitch from '../components/common/ToggleSwitch';
import { usePreferences } from '../context/PreferencesContext';

const SettingsPage = () => {
  const { preferences, updatePreference, resetPreferences } = usePreferences();

  return (
    <div className="page-container">
      <div className="section-container">
        <PageHeader
          title="Settings"
          action={
            <button type="button" onClick={resetPreferences} className="btn-secondary">
              Reset Defaults
            </button>
          }
        />

        <div className="grid gap-4 xl:grid-cols-[0.9fr,1.1fr]">
          <div className="card space-y-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Theme
              </label>
              <select
                className="input-base"
                value={preferences.theme}
                onChange={(event) => updatePreference('theme', event.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <ToggleSwitch
              checked={preferences.notifications}
              onChange={(value) => updatePreference('notifications', value)}
              label="Notifications"
              description="Enable notification alerts and unread badge updates in the UI."
            />

            <ToggleSwitch
              checked={preferences.autoRefresh}
              onChange={(value) => updatePreference('autoRefresh', value)}
              label="Auto-refresh"
              description="Refresh dashboard, history, and alerts automatically every 5 seconds."
            />

            <ToggleSwitch
              checked={preferences.compactCards}
              onChange={(value) => updatePreference('compactCards', value)}
              label="Compact dashboard cards"
              description="Use denser spacing for detection cards and widgets."
            />

            <ToggleSwitch
              checked={preferences.showDeletedOnHistory}
              onChange={(value) => updatePreference('showDeletedOnHistory', value)}
              label="Show deleted items in history"
              description="Allow deleted detections to appear in history when needed."
            />
          </div>

          <div className="card">
            <h3 className="card-title">Preference summary</h3>

            <div className="mt-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                <p className="font-semibold text-slate-900 dark:text-white">Theme</p>
                <p className="mt-2 capitalize">{preferences.theme}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                <p className="font-semibold text-slate-900 dark:text-white">Notifications</p>
                <p className="mt-2">{preferences.notifications ? 'Enabled' : 'Disabled'}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                <p className="font-semibold text-slate-900 dark:text-white">Auto-refresh</p>
                <p className="mt-2">
                  {preferences.autoRefresh ? 'Enabled (5 sec interval)' : 'Disabled'}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                <p className="font-semibold text-slate-900 dark:text-white">Dashboard mode</p>
                <p className="mt-2">{preferences.compactCards ? 'Compact' : 'Comfortable'}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                <p className="font-semibold text-slate-900 dark:text-white">Deleted records in history</p>
                <p className="mt-2">{preferences.showDeletedOnHistory ? 'Visible' : 'Hidden'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;