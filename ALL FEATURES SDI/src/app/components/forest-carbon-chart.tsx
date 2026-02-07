import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function ForestCarbonChart() {
  const data = [
    { year: '2019', forest: 185, carbon: 2450 },
    { year: '2020', forest: 212, carbon: 2280 },
    { year: '2021', forest: 245, carbon: 2090 },
    { year: '2022', forest: 278, carbon: 1880 },
    { year: '2023', forest: 312, carbon: 1650 },
    { year: '2024', forest: 348, carbon: 1420 },
    { year: '2025', forest: 385, carbon: 1210 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-gray-900 mb-1">Forest Cover vs Carbon Emissions (2019–2025)</h3>
        <p className="text-sm text-gray-500">Hectares of green cover and metric tons CO₂e</p>
      </div>
      
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorForest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis 
            dataKey="year" 
            stroke="#9ca3af" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            yAxisId="left"
            stroke="#9ca3af" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            label={{ value: 'Forest (ha)', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11 }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="#9ca3af" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            label={{ value: 'Carbon (t)', angle: 90, position: 'insideRight', fill: '#6b7280', fontSize: 11 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            labelStyle={{ color: '#374151', fontWeight: 600 }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px', color: '#6b7280', paddingTop: '16px' }}
            iconSize={12}
          />
          <Area 
            yAxisId="left"
            type="monotone" 
            dataKey="forest" 
            stroke="#10b981" 
            strokeWidth={2.5}
            fillOpacity={1} 
            fill="url(#colorForest)"
            name="Forest Cover (ha)"
          />
          <Area 
            yAxisId="right"
            type="monotone" 
            dataKey="carbon" 
            stroke="#ef4444" 
            strokeWidth={2.5}
            fillOpacity={1} 
            fill="url(#colorCarbon)"
            name="Carbon Emissions (t)"
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
        <span className="text-gray-500">Target: 450 hectares by 2030</span>
        <div className="flex items-center gap-4">
          <span className="text-emerald-600 font-medium">↑ 108% forest growth</span>
          <span className="text-emerald-600 font-medium">↓ 51% emissions reduction</span>
        </div>
      </div>
    </div>
  );
}
