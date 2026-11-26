import { Menu, Search, Bell, Leaf, ChevronDown, User, Settings, LifeBuoy, LogOut, Pencil } from 'lucide-react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { SIDEBAR_LINKS } from '../utils/constants';
import Avatar from '../components/common/Avatar';
import { useAuth } from '../context/AuthContext';
import { usePreferences } from '../context/PreferencesContext';
import { apiService } from '../services/api';
import { MdHealthAndSafety, MdOutlineWifiProtectedSetup } from 'react-icons/md';
import { SiCcleaner } from 'react-icons/si';

const navBase =
  'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-green-50 hover:text-brand dark:hover:bg-slate-800';
const navActive = 'bg-brand text-white hover:bg-brand hover:text-white dark:bg-brand';

const ProtectedLayout = () => {
  const { user, logout } = useAuth();
  const { preferences } = usePreferences();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const profileMenuRef = useRef(null);

  const title = useMemo(() => {
    const item = SIDEBAR_LINKS.find((link) => link.path === location.pathname);
    return item?.label || 'Dashboard';
  }, [location.pathname]);

  const handleLogout = () => {
    setProfileMenuOpen(false);
    logout();
    navigate('/login');
  };

  useEffect(() => {
    let mounted = true;

    const fetchCount = async () => {
      if (!preferences?.notifications || !preferences?.autoRefresh) return;
      try {
        const count = await apiService.getUnreadCount();
        if (mounted) setUnreadCount(count || 0);
      } catch {
        if (mounted) setUnreadCount(0);
      }
    };

    fetchCount();

    if (!preferences?.notifications || !preferences?.autoRefresh) {
      return () => {
        mounted = false;
      };
    }

    const interval = window.setInterval(fetchCount, 5000);

    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, [preferences?.notifications, preferences?.autoRefresh]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="flex min-h-screen">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white px-5 py-6 transition-transform dark:border-slate-800 dark:bg-slate-900 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-2xl bg-brand px-3 py-2 text-lg font-bold text-white">AI</div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Garbage Monitor</p>
              <p className="text-sm text-slate-500 dark:text-slate-300">Admin control center</p>
            </div>
          </div>

          <nav className="space-y-2">
            {SIDEBAR_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `${navBase} ${isActive ? navActive : 'text-slate-600 dark:text-slate-300'}`
                }
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-green-50 text-brand dark:bg-slate-800">
                  <Leaf size={16} />
                </span>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-12 flex items-center justify-between rounded-xl bg-brand-light px-5 py-4 text-xl text-slate-800 dark:bg-green-950/40 dark:text-green-100">
            <MdHealthAndSafety />
            <MdOutlineWifiProtectedSetup />
            <SiCcleaner />
          </div>
        </aside>

        {sidebarOpen && (
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
            aria-label="Close sidebar overlay"
          />
        )}

        <div className="min-w-0 flex-1 lg:ml-72">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
            <div className="w-full px-4 py-1 sm:px-8 lg:px-10 lg:py-2">
              <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-200 lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <Menu size={20} />
                  </button>

                  <div>
                    <p className="text-sm font-medium text-brand">AI Waste Intelligence</p>
                    <h1 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h1>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative w-full sm:w-80">
                    <Search
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search detections..."
                      className="input-base pl-11"
                    />
                  </div>

                  <button
                    type="button"
                    className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    onClick={() => navigate('/notifications')}
                  >
                    <Bell size={18} />
                    {preferences?.notifications && unreadCount > 0 && (
                      <span className="absolute -right-1 -top-1 min-w-[18px] rounded-full bg-red-500 px-1.5 py-0.5 text-center text-[10px] font-bold text-white">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  <div className="relative" ref={profileMenuRef}>
                    <button
                      type="button"
                      onClick={() => setProfileMenuOpen((prev) => !prev)}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                    >
                      <Avatar name={user?.name} src={user?.avatar} size="sm" />
                      <div className="hidden text-left md:block">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {user?.name || 'User'}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-300">
                          {user?.role || 'user'}
                        </p>
                      </div>
                      <ChevronDown size={16} className="text-slate-500" />
                    </button>

                    {profileMenuOpen && (
                      <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
                        <div className="border-b border-slate-200 px-4 py-4 dark:border-slate-800">
                          <div className="flex items-center gap-3">
                            <Avatar name={user?.name} src={user?.avatar} size="md" />
                            <div className="min-w-0">
                              <p className="truncate font-semibold text-slate-900 dark:text-white">
                                {user?.name || 'User'}
                              </p>
                              <p className="truncate text-sm text-slate-500 dark:text-slate-300">
                                {user?.email || 'No email'}
                              </p>
                              <p className="mt-1 text-xs uppercase tracking-wide text-brand">
                                {user?.role || 'user'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-2">
                          <button
                            type="button"
                            onClick={() => {
                              setProfileMenuOpen(false);
                              navigate('/profile');
                            }}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                          >
                            <User size={16} />
                            User Details
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setProfileMenuOpen(false);
                              navigate('/profile');
                            }}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                          >
                            <Pencil size={16} />
                            Edit Profile
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setProfileMenuOpen(false);
                              navigate('/settings');
                            }}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                          >
                            <Settings size={16} />
                            Settings
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setProfileMenuOpen(false);
                              window.location.href = 'mailto:support@garbagedetect.ai';
                            }}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                          >
                            <LifeBuoy size={16} />
                            Support
                          </button>

                          <div className="my-2 border-t border-slate-200 dark:border-slate-800" />

                          <button
                            type="button"
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/20"
                          >
                            <LogOut size={16} />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="w-full px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">
              <Outlet context={{ searchQuery }} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;