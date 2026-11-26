import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const PIE_COLORS = ['#22C55E', '#EF4444', '#6B7280'];

const StatusPieChart = ({ data }) => (
  <div className="card">
    <div className="mb-6">
      <h3 className="card-title">Status Distribution</h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
        Active verification mix across current detections.
      </p>
    </div>
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} paddingAngle={4}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default StatusPieChart;
