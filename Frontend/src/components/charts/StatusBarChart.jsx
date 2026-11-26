import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const BAR_COLORS = ['#16A34A', '#22C55E', '#F59E0B', '#EF4444', '#6B7280'];

const StatusBarChart = ({ data }) => (
  <div className="card">
    <div className="mb-6">
      <h3 className="card-title">Detections by Location</h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
        Compare monitoring activity across collection zones.
      </p>
    </div>
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="count" radius={[12, 12, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={BAR_COLORS[index % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default StatusBarChart;
