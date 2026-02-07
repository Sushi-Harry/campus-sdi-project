import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function RainwaterPredictionChart() {
  const data = [
    { month: 'Jan', actual: 168, predicted: 172, capacity: 220 },
    { month: 'Feb', actual: 182, predicted: 179, capacity: 220 },
    { month: 'Mar', actual: 156, predicted: 162, capacity: 220 },
    { month: 'Apr', actual: 134, predicted: 138, capacity: 220 },
    { month: 'May', actual: 108, predicted: 105, capacity: 220 },
    { month: 'Jun', actual: 95, predicted: 98, capacity: 220 },
    { month: 'Jul', actual: null, predicted: 92, capacity: 220 },
    { month: 'Aug', actual: null, predicted: 86, capacity: 220 },
    { month: 'Sep', actual: null, predicted: 118, capacity: 220 },
    { month: 'Oct', actual: null, predicted: 145, capacity: 220 },
    { month: 'Nov', actual: null, predicted: 164, capacity: 220 },
    { month: 'Dec', actual: null, predicted: 175, capacity: 220 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-gray-900 mb-1">Rainwater Harvesting Forecast (Monthly)</h3>
        <p className="text-sm text-gray-500">Collection volume in cubic meters with ML predictions</p>
      </div>
      
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis 
            dataKey="month" 
            stroke="#9ca3af" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            stroke="#9ca3af" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            label={{ value: 'Volume (m³)', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11 }}
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
          <Line 
            type="monotone" 
            dataKey="capacity" 
            stroke="#d1d5db" 
            strokeWidth={1.5}
            strokeDasharray="5 5"
            dot={false}
            name="Max Capacity"
          />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#0ea5e9" 
            strokeWidth={2.5}
            dot={{ fill: '#0ea5e9', r: 4, strokeWidth: 2, stroke: '#fff' }}
            name="Actual Collection"
          />
          <Line 
            type="monotone" 
            dataKey="predicted" 
            stroke="#8b5cf6" 
            strokeWidth={2.5}
            strokeDasharray="6 4"
            dot={{ fill: '#8b5cf6', r: 4, strokeWidth: 2, stroke: '#fff' }}
            name="ML Prediction"
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
        <span className="text-gray-500">ML Model: LSTM Neural Network (R² = 0.94)</span>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Annual Avg: <span className="text-gray-900 font-medium">135 m³/month</span></span>
          <span className="text-blue-600 font-medium">↑ 23% efficiency gain</span>
        </div>
      </div>
    </div>
  );
}
