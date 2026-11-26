import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!form.name.trim()) return 'Name is required.';
    if (!form.email.trim()) return 'Email is required.';
    if (!/\S+@\S+\.\S+/.test(form.email)) return 'Please enter a valid email.';
    if (form.password.length < 6) return 'Password must be at least 6 characters.';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validation = validate();
    if (validation) {
      setError(validation);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await signup({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        username: form.email.trim() // backend expects username
      });

      setSuccess('Account created successfully. Redirecting to login...');

      setTimeout(() => {
        navigate('/login');
      }, 1200);

    } catch (err) {
      setError(err?.message || 'Unable to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container flex min-h-screen items-center justify-center">
      <div className="grid w-full max-w-5xl gap-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-2 lg:p-8">

        {/* LEFT PANEL */}
        <div className="rounded-[2rem] bg-slate-900 p-8 text-white">
          <div className="rounded-2xl bg-white/15 px-3 py-2 text-sm font-semibold uppercase tracking-[0.2em]">
            AI
          </div>

          <h1 className="mt-8 text-4xl font-bold">Create your account</h1>

          <p className="mt-4 text-slate-300">
            Start monitoring garbage detection insights and stay connected with real-time alerts.
          </p>
        </div>

        {/* FORM */}
        <div className="flex items-center">
          <form onSubmit={handleSubmit} className="w-full space-y-5">

            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Sign up</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-300">
                Create an account to access the system.
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                {success}
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-semibold">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input-base"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                className="input-base"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Password</label>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                className="input-base"
                placeholder="Minimum 6 characters"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              <UserPlus size={18} className="mr-2" />
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <p className="text-sm text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-brand">
                Log in
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;