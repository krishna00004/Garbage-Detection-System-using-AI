import {
  ArrowRight,
  BellRing,
  ChartNoAxesCombined,
  Map,
  Recycle,
  ShieldCheck,
  Sparkles,
  Waves
} from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Real-Time Detection',
    description: 'Stream AI-assisted waste monitoring data with responsive visual dashboards.',
    icon: Recycle
  },
  {
    title: 'Smart Analytics',
    description: 'Track operational trends, verification rates, and overflow hotspots.',
    icon: ChartNoAxesCombined
  },
  {
    title: 'Instant Alerts',
    description: 'Flag pending or high-fill detections for quick response and cleanup prioritization.',
    icon: BellRing
  },
  {
    title: 'Zone Mapping',
    description: 'Monitor collection zones with location-aware detection summaries.',
    icon: Map
  }
];

const steps = [
  {
    title: 'Capture detections',
    description: 'Garbage-bin images and metadata are processed by your existing backend.',
    number: '01'
  },
  {
    title: 'Review and verify',
    description: 'Admins confirm AI output, resolve pending items, and manage cleanup status.',
    number: '02'
  },
  {
    title: 'Optimize operations',
    description: 'Analytics highlight trends, bottlenecks, and areas that require intervention.',
    number: '03'
  }
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <header className="page-container py-6">
        <div className="section-container surface flex flex-col gap-4 rounded-3xl px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-brand px-3 py-2 text-lg font-bold text-white">AI</div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Garbage Detection System</p>
              <p className="text-sm text-slate-500 dark:text-slate-300">AI-powered waste monitoring</p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => window.location.href = "/login"}
              className="btn-secondary"
            >
              Login
            </button>
            <Link to="/signup" className="btn-primary">
              Signup
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="page-container pt-10 lg:pt-14">
          <div className="section-container grid items-center gap-10 lg:grid-cols-[1.15fr,0.85fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-100 px-4 py-2 text-sm font-semibold text-brand dark:border-green-900 dark:bg-green-950/60 dark:text-green-300">
                <Sparkles size={16} />
                Cleaner cities through AI intelligence
              </div>
              <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                AI-Powered Garbage Detection System
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                Monitor waste levels, verify AI detections, and drive faster response with a modern,
                analytics-first operations dashboard.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                    onClick={() => window.location.href = "/login"}
                    className="btn-primary"
                  >
                    Get Started
                  </button>
                <a href="#features" className="btn-secondary">
                  View Features
                </a>
              </div>
            </div>

            <div className="surface overflow-hidden rounded-[2rem] border border-green-100 p-4 shadow-soft dark:border-slate-800">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-brand p-6 text-white">
                  <ShieldCheck size={28} />
                  <h3 className="mt-4 text-2xl font-bold">99%</h3>
                  <p className="mt-2 text-sm text-green-50">Reliable admin oversight for every detection workflow.</p>
                </div>
                <div className="rounded-3xl bg-slate-900 p-6 text-white dark:bg-slate-800">
                  <Waves size={28} />
                  <h3 className="mt-4 text-2xl font-bold">24/7</h3>
                  <p className="mt-2 text-sm text-slate-300">Always-on monitoring experience with responsive UI states.</p>
                </div>
                <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                  <p className="text-sm font-semibold text-brand">Pending Alerts</p>
                  <h4 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">12</h4>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Prioritize overflow bins instantly.</p>
                </div>
                <div className="rounded-3xl bg-brand-light p-6 text-slate-900 dark:bg-green-950/50 dark:text-green-100">
                  <p className="text-sm font-semibold text-brand dark:text-green-300">Verified Cleanup</p>
                  <h4 className="mt-3 text-3xl font-bold">84%</h4>
                  <p className="mt-2 text-sm text-slate-600 dark:text-green-200">Track operations with clean reporting.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="page-container py-8 lg:py-12">
          <div className="section-container">
            <h2 className="section-title">Built for modern waste operations</h2>
            <p className="section-subtitle">
              A scalable, eco-friendly interface designed for responsive monitoring teams.
            </p>

            <div className="mt-10 grid gap-4 lg:grid-cols-4 lg:gap-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article key={feature.title} className="card h-full">
                    <div className="inline-flex rounded-2xl bg-brand-light p-3 text-brand dark:bg-green-950 dark:text-green-300">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="page-container py-8 lg:py-12">
          <div className="section-container rounded-[2rem] bg-slate-900 px-6 py-12 text-white dark:bg-slate-900">
            <h2 className="section-title text-white">How it works</h2>
            <p className="section-subtitle text-slate-300">
              A simple three-step workflow for detection review and operational action.
            </p>

            <div className="mt-10 grid gap-4 lg:grid-cols-3 lg:gap-6">
              {steps.map((step) => (
                <article key={step.number} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-300">{step.number}</p>
                  <h3 className="mt-4 text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-slate-300">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="page-container">
        <div className="section-container grid gap-8 rounded-[2rem] border border-slate-200 bg-white px-6 py-10 dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[1fr,auto] lg:items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Let your team operate cleaner and faster</h2>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
              Questions, onboarding, or support? Reach out to the operations support team.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-300">
            <a href="mailto:support@garbagedetect.ai">support@garbagedetect.ai</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <Link to="/login" className="font-semibold text-brand">
              Admin Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
