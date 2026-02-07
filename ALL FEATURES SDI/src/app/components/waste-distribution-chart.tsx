import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export function WasteDistributionChart() {
  const data = [
    { name: 'Organic', value: 42, color: '#10b981' },
    { name: 'Recyclable', value: 35, color: '#3b82f6' },
    { name: 'E-Waste', value: 12, color: '#f59e0b' },
    { name: 'Hazardous', value: 6, color: '#ef4444' },
    { name: 'Other', value: 5, color: '#6b7280' },
  ];

  const COLORS = data.map(item => item.color);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
      <div className="mb-4">
        <h3 className="text-gray-900 mb-1">Waste Stream Distribution</h3>
        <p className="text-sm text-gray-500">Category breakdown</p>
      </div>
      
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            formatter={(value: number) => [`${value}%`, 'Share']}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="mt-4 space-y-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-gray-600">{item.name}</span>
            </div>
            <span className="text-gray-900 font-medium">{item.value}%</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-500">Total waste processed</div>
        <div className="text-2xl font-semibold text-gray-900 mt-1">2,847 kg/day</div>
        <div className="text-xs text-emerald-600 font-medium mt-1">↓ 32% reduction YoY</div>
      </div>
    </div>
  );
}
