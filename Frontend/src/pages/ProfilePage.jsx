import { HelpCircle, LogOut, Mail, Phone, Save, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import Avatar from '../components/common/Avatar';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'admin',
    phone: user?.phone || '',
    avatar: user?.avatar || ''
  });

  const supportEmail = useMemo(() => user?.supportEmail || 'support@garbagedetect.ai', [user?.supportEmail]);

  const handleAvatarUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateProfile(form);
    setMessage('Profile updated successfully.');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="page-container">
      <div className="section-container">
        <PageHeader
          title="Profile"
        />

        {message ? (
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-950 dark:bg-green-950/20 dark:text-green-300">
            {message}
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
          <div className="card">
            <div className="flex flex-col items-center text-center">
              <Avatar name={form.name} src={form.avatar} size="lg" />
              <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">{form.name || 'Admin User'}</h2>
              <p className="mt-1 text-sm uppercase tracking-wide text-brand">{form.role}</p>
              <label className="btn-secondary mt-6 cursor-pointer">
                <Upload size={16} className="mr-2" />
                Upload Avatar
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              </label>

              <div className="mt-8 w-full space-y-4 text-left">
                <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-brand" />
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{form.email}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-300">Primary email</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-brand" />
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{form.phone || 'Not provided'}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-300">Phone number</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <HelpCircle size={16} className="text-brand" />
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{supportEmail}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-300">Support contact</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Name</label>
                <input
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  className="input-base"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Email</label>
                <input
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  className="input-base"
                  type="email"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Role</label>
                <input value={form.role} className="input-base" disabled />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Phone</label>
                <input
                  value={form.phone}
                  onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                  className="input-base"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <button type="button" onClick={handleSave} className="btn-primary">
                <Save size={16} className="mr-2" />
                Save Changes
              </button>
              <button type="button" onClick={() => navigate('/settings')} className="btn-secondary">
                Settings
              </button>
              <button type="button" onClick={handleLogout} className="btn-danger">
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
