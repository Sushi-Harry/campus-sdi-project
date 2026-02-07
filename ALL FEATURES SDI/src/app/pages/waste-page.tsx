import React, { useState, useEffect } from "react";
import { Recycle, TrendingDown, TrendingUp, Trash2, Package, AlertTriangle } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function WastePage() {
  // --- State for API Data ---
  const [compost, setCompost] = useState(500);
  const [simulation, setSimulation] = useState({ reduction: 0, new_diversion_rate: 0 });
  const [wasteData, setWasteData] = useState(null);

  // --- Static Data (Placeholders until API loads) ---
  const wasteDistribution = [
    { name: 'Organic', value: 42, color: '#10b981', weight: 1197 },
    { name: 'Recyclable', value: 35, color: '#3b82f6', weight: 996 },
    { name: 'E-Waste', value: 12, color: '#f59e0b', weight: 342 },
    { name: 'Hazardous', value: 6, color: '#ef4444', weight: 171 },
    { name: 'Other', value: 5, color: '#6b7280', weight: 141 },
  ];

  const weeklyTrend = [
    { day: 'Mon', total: 2950, diverted: 2410, landfill: 540 },
    { day: 'Tue', total: 3120, diverted: 2580, landfill: 540 },
    { day: 'Wed', total: 2880, diverted: 2350, landfill: 530 },
    { day: 'Thu', total: 3050, diverted: 2520, landfill: 530 },
    { day: 'Fri', total: 3200, diverted: 2670, landfill: 530 },
    { day: 'Sat', total: 2340, diverted: 1890, landfill: 450 },
    { day: 'Sun', total: 2180, diverted: 1740, landfill: 440 },
  ];

  const recyclingProgress = [
    { month: 'Jan', rate: 72, weight: 84500 },
    { month: 'Feb', rate: 74, weight: 79200 },
    { month: 'Mar', rate: 76, weight: 88700 },
    { month: 'Apr', rate: 77, weight: 85300 },
    { month: 'May', rate: 79, weight: 89100 },
    { month: 'Jun', rate: 81, weight: 86400 },
  ];

  const facilitiesData = [
    { name: 'Academic Buildings', daily: 1240, diversion: 78 },
    { name: 'Hostels', daily: 890, diversion: 85 },
    { name: 'Cafeterias', daily: 620, diversion: 92 },
    { name: 'Labs & Research', daily: 340, diversion: 68 },
    { name: 'Admin & Others', daily: 257, diversion: 72 },
  ];

  const eWasteBreakdown = [
    { category: 'Computers & Laptops', count: 142, weight: 890 },
    { category: 'Mobile Phones', count: 267, weight: 45 },
    { category: 'Printers & Scanners', count: 38, weight: 320 },
    { category: 'Lab Equipment', count: 89, weight: 1240 },
    { category: 'Batteries', count: 456, weight: 178 },
    { category: 'Other Electronics', count: 203, weight: 425 },
  ];

  // --- Effects ---
  useEffect(() => {
    // Fetch initial waste data
    fetch("http://127.0.0.1:8000/waste")
      .then(res => res.json())
      .then(data => setWasteData(data))
      .catch(err => console.error("Error fetching waste:", err));

    // Initial Simulation
    handleSimulation(compost);
  }, []);

  const handleSimulation = (value: number) => {
    fetch(`http://127.0.0.1:8000/waste/simulate?extra_compost_kg=${value}`)
      .then(res => res.json())
      .then(data => setSimulation(data))
      .catch(err => console.error("Error fetching simulation:", err));
  };

  return (
    <div className="space-y-8 p-4">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-gray-900 text-2xl font-bold mb-1">Waste Management</h1>
          <p className="text-gray-500 text-sm">Comprehensive tracking of waste generation, segregation, and recycling operations</p>
        </div>
        
        {/* What-if Simulation Control */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 w-72">
          <h4 className="font-semibold text-emerald-900 text-sm mb-2">What-if Simulation</h4>
          <input
            type="range"
            min={100}
            max={1000}
            step={50}
            value={compost}
            className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer mb-2"
            onChange={(e) => {
              const v = Number(e.target.value);
              setCompost(v);
              handleSimulation(v);
            }}
          />
          <div className="text-xs text-emerald-800 space-y-1">
            <p>Adding <b>{compost} kg/day</b> composting reduces landfill by <b>{simulation.reduction} kg</b></p>
            <p>New diversion rate: <b>{simulation.new_diversion_rate}%</b></p>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-600 uppercase tracking-wide font-bold">Daily Waste</span>
            <Trash2 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">2,847 kg</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
            <TrendingDown className="w-3 h-3" />
            <span>32% reduction YoY</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-600 uppercase tracking-wide font-bold">Diversion Rate</span>
            <Recycle className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">81%</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+9% this year</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-600 uppercase tracking-wide font-bold">Composted</span>
            <Package className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">1,197 kg</div>
          <div className="flex items-center gap-1 text-xs text-gray-600 font-medium">
            <span>42% of total</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-600 uppercase tracking-wide font-bold">To Landfill</span>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">540 kg</div>
          <div className="flex items-center gap-1 text-xs text-red-600 font-medium">
            <span>19% of total</span>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-gray-900 font-bold mb-1">Weekly Waste Generation & Diversion</h3>
            <p className="text-sm text-gray-500">Total waste vs diverted from landfill</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="day" stroke="#9ca3af" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis stroke="#9ca3af" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="diverted" stackId="a" fill="#10b981" name="Diverted" />
              <Bar dataKey="landfill" stackId="a" fill="#ef4444" name="To Landfill" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 font-bold mb-1">Waste Stream Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={wasteDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80}>
                {wasteDistribution.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {wasteDistribution.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs">
                <span className="text-gray-600">{item.name}</span>
                <span className="font-bold">{item.value}% ({item.weight} kg)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Facility & E-Waste Row */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-bold mb-4">Facility Waste Performance</h3>
          <div className="space-y-4">
            {facilitiesData.map((f, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{f.name}</span>
                  <span className="font-bold text-emerald-600">{f.diversion}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${f.diversion}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-bold mb-4">E-Waste Collection (YTD)</h3>
          {eWasteBreakdown.slice(0, 4).map((item, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-600">{item.category}</span>
              <span className="text-sm font-bold">{item.weight} kg</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}