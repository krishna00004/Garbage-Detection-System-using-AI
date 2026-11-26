import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: 'admin@garbagedetect.ai',
    password: 'Admin@123'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.unauthorized) {
      setError('You are not authorized to access the admin dashboard.');
    }
  }, [location.state]);

  const validate = () => {
    if (!form.email.trim()) return 'Email or username is required.';
    if (!form.password) return 'Password is required.';
    return '';
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationMessage = validate();
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const loggedInUser = await login({
        email: form.email.trim(),
        password: form.password
      });

      if (loggedInUser?.role !== 'admin') {
        setError('Only admin can access dashboard.');
        return;
      }

      const redirectPath = location.state?.from?.pathname || '/dashboard';
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err?.message || 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container flex min-h-screen items-center justify-center">
      <div className="grid w-full max-w-5xl gap-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-2 lg:p-8">
        <div className="rounded-[2rem] bg-brand p-8 text-white">
          <div className="rounded-2xl bg-white/15 px-3 py-2 text-sm font-semibold uppercase tracking-[0.2em]">
            AI
          </div>

          <h1 className="mt-8 text-4xl font-bold">Admin Login</h1>
          <p className="mt-4 text-green-50">
            Access detection history, analytics, notifications, and system controls from one secure dashboard.
          </p>

          <div className="mt-8 rounded-3xl bg-white/10 p-5 text-sm">
            <p className="font-semibold">Demo admin credentials</p>
            <p className="mt-2">admin@garbagedetect.ai</p>
            <p>Admin@123</p>
          </div>
        </div>

        <div className="flex items-center">
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-300">
                Sign in to continue to the admin workspace.
              </p>
            </div>

            {error ? (
              <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-950 dark:bg-red-950/30 dark:text-red-300">
                <AlertCircle size={18} className="mt-0.5" />
                <span>{error}</span>
              </div>
            ) : null}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Email or Username
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="text"
                className="input-base"
                placeholder="Enter email or username"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Password
              </label>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                className="input-base"
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              <LogIn size={18} className="mr-2" />
              {loading ? 'Signing in...' : 'Log in'}
            </button>

            <p className="text-sm text-slate-500 dark:text-slate-300">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="font-semibold text-brand">
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;