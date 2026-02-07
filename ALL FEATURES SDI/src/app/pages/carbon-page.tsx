import React, { useState, useEffect } from "react";
import { Leaf, TrendingDown, ShieldAlert, Zap, Factory, BarChart3, Info, Building2, Calendar } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, Cell } from "recharts";

// --- Hardcoded Demo Intelligence ---
const DEFAULT_RECOMMENDATIONS = [
  "Scope 2 Optimization: High grid reliance detected in Research Wing. Deploying an additional 250kW solar array will reduce annual Scope 2 by 12%.",
  "Thermal Efficiency: Direct emissions (Scope 1) in Academic Block B are 8% above baseline. Audit HVAC seals to prevent thermal leakage.",
  "Sequestration Strategy: Current trajectory requires 4.5 acres of Miyawaki forest expansion to neutralize the Scope 3 surplus by 2030.",
  "Waste-to-Energy: Diverting 2.5 tonnes of mess organic waste to the bio-digester can offset 15t of annual CO₂e footprint."
];

const buildingEmissions = [
  { name: 'Research Lab A', emissions: 342, color: '#0f172a' }, 
  { name: 'Main Hostel', emissions: 285, color: '#334155' },
  { name: 'Academic Block', emissions: 190, color: '#475569' },
  { name: 'Admin Center', emissions: 145, color: '#64748b' },
  { name: 'Library', emissions: 98, color: '#94a3b8' },
  { name: 'Sports Complex', emissions: 150, color: '#cbd5e1' },
];

const yearlyEmissions = [
  { year: '2019', scope1: 820, scope2: 1950, scope3: 2450 },
  { year: '2020', scope1: 780, scope2: 1820, scope3: 2300 },
  { year: '2021', scope1: 720, scope2: 1680, scope3: 2100 },
  { year: '2022', scope1: 660, scope2: 1520, scope3: 1900 },
  { year: '2023', scope1: 600, scope2: 1380, scope3: 1700 },
  { year: '2024', scope1: 520, scope2: 1200, scope3: 1500 },
  { year: '2025', scope1: 460, scope2: 1080, scope3: 1320 },
];

export function CarbonPage() {
  const [intel, setIntel] = useState<any>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/carbon/intelligence")
      .then((r) => r.json())
      .then(setIntel)
      .catch((err) => console.error("Intelligence Link Offline:", err));
  }, []);

  // Use API if available, else use hardcoded demo values
  const isAlert = intel?.is_alert ?? true; 
  const currentTotal = intel?.current_total ?? 2860;
  const debt = intel?.debt ?? 487;
  const status = intel?.status ?? "Delayed";
  const projectedYear = intel?.projected_year ?? 2032;
  const actions = intel?.recommendations ?? DEFAULT_RECOMMENDATIONS;

  return (
    <div className="space-y-8 p-10 bg-[#fafbfc] min-h-screen text-slate-900 font-sans">
      
      {/* 1. Header & Alert System */}
      <header className="flex justify-between items-start border-b border-slate-100 pb-8">
        <div>
          <h1 className="text-3xl font-light tracking-tight">Carbon <span className="font-bold text-black">Intelligence</span></h1>
          <p className="text-slate-400 text-[10px] mt-1 uppercase tracking-[0.2em] font-bold">Thapar University Net Zero Track • Live Audit</p>
        </div>
        
        {/* ✅ Alert box restored */}
        {isAlert && (
          <div className="flex items-center gap-4 bg-red-50 border border-red-100 px-6 py-3 rounded-2xl animate-pulse">
            <ShieldAlert className="text-red-500 w-5 h-5" />
            <div>
              <div className="text-[9px] font-black text-red-400 uppercase tracking-tighter">Carbon Debt Alert</div>
              <div className="text-sm font-bold text-red-700">+{debt} t CO₂e Surplus</div>
            </div>
          </div>
        )}
      </header>

      {/* 2. Metric Cards Grid */}
      <div className="grid grid-cols-4 gap-8">
        <MetricCard title="Actual Emissions" value={`${currentTotal}t`} label="Latest 2025 Audit" icon={<Factory />} color="slate" />
        <MetricCard title="Net Zero Status" value={status} label="Trajectory Health" icon={<Leaf />} color={projectedYear > 2030 ? "red" : "emerald"} />
        <MetricCard title="Emissions Debt" value={`${debt}t`} label="Surplus vs Baseline" icon={<Zap />} color="red" />
        <MetricCard title="Net-Zero Forecast" value={projectedYear} label="Current Pace Prediction" icon={<Calendar />} color={projectedYear > 2030 ? "red" : "emerald"} />
      </div>

      <div className="grid grid-cols-12 gap-8 mt-4">
        
        {/* 3. Historical Scope Analysis (Original Colors) */}
        <div className="col-span-12 lg:col-span-8 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="mb-10">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Historical Emissions by Scope (2019–2025)</h3>
            <p className="text-[11px] text-slate-400 italic">GHG Protocol: Scope 1 (Direct), Scope 2 (Electricity), Scope 3 (Indirect)</p>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yearlyEmissions}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} fontSize={12} tick={{fill: '#94a3b8'}} />
                <YAxis hide />
                <Tooltip />
                <Legend iconType="circle" verticalAlign="top" height={36}/>
                <Area type="monotone" dataKey="scope1" stackId="1" stroke="#ef4444" fill="#ef444410" name="Scope 1" />
                <Area type="monotone" dataKey="scope2" stackId="1" stroke="#f97316" fill="#f9731610" name="Scope 2" />
                <Area type="monotone" dataKey="scope3" stackId="1" stroke="#fbbf24" fill="#fbbf2410" name="Scope 3" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Autonomous Strategic Actions Sidebar */}
        <div className="col-span-12 lg:col-span-4 bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10"><Zap size={80} /></div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-8 flex items-center gap-2 font-mono">
              Autonomous Actions
          </h3>
          <div className="space-y-8">
            {actions.map((rec: string, i: number) => {
              const [category, detail] = rec.split(':');
              return (
                <div key={i} className="flex flex-col gap-2 group">
                  <div className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0 group-hover:scale-150 transition-all" />
                    <p className="text-[11px] text-slate-100 leading-relaxed font-bold tracking-tight uppercase">
                      {category}
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-400 pl-5 italic leading-relaxed">
                    {detail || "Analysis in progress..."}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Building-Wise Vertical Graph (Monochrome Slate) */}
      <div className="col-span-12 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm mt-4">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8">Building-Wise Emission Distribution (t CO₂e)</h3>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={buildingEmissions} layout="vertical" margin={{ left: 40, right: 40 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={11} width={120} tick={{fill: '#64748b', fontWeight: 600}} />
              <Tooltip cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="emissions" radius={[0, 8, 8, 0]} barSize={32}>
                {buildingEmissions.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// --- Helper Metric Card ---
function MetricCard({ title, value, label, icon, color }: any) {
  const colors: any = { 
    emerald: "text-emerald-500 bg-emerald-50", 
    red: "text-red-500 bg-red-50", 
    blue: "text-blue-500 bg-blue-50", 
    slate: "text-slate-500 bg-slate-50" 
  };
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm transition-all hover:scale-[1.02]">
      <div className="flex justify-between items-center mb-6">
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{title}</span>
        <div className={`p-2.5 rounded-2xl ${colors[color]}`}>{icon}</div>
      </div>
      <div className="text-4xl font-black tracking-tight mb-2">{value}</div>
      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{label}</div>
    </div>
  );
}