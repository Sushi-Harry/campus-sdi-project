import React, { useEffect, useState, useRef } from "react";
import { Zap, Sun, Battery, ShieldCheck, AlertCircle, BarChart3, Download, Globe } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function EnergyPage() {
  const [live, setLive] = useState<any>(null);
  const [history, setHistory] = useState([]);
  const [graph, setGraph] = useState<any[]>([]);
  const [solarKW, setSolarKW] = useState(500);
  const [modelResult, setModelResult] = useState<any>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLive = () => {
      fetch("http://127.0.0.1:8000/energy/live")
        .then(res => res.json())
        .then(data => {
          setLive(data);
          // Rolling pulse window
          setGraph(prev => [...prev.slice(-14), {
            t: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            load: data.total_load,
            solar: data.solar_gen
          }]);
        });
    };

    // INSTANT LOAD: Call immediately on mount
    fetchLive(); 
    fetch("http://127.0.0.1:8000/energy/monthly").then(res => res.json()).then(setHistory);

    const tick = setInterval(fetchLive, 5000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/energy/recommendations/solar?extra_solar_kw=${solarKW}`)
      .then(res => res.json()).then(setModelResult);
  }, [solarKW]);

  const exportAudit = async () => {
    const canvas = await html2canvas(dashboardRef.current!, { scale: 2, useCORS: true });
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, (canvas.height * 210) / canvas.width);
    pdf.save("Campus_Sustainability_Audit.pdf");
  };

  if (!live) return <div className="flex h-screen items-center justify-center font-mono text-slate-400 animate-pulse">SYNCHRONIZING DIGITAL TWIN NODES...</div>;

  return (
    <div className="min-h-screen bg-[#fafbfc] p-8 text-slate-900" ref={dashboardRef}>
      {/* Premium Header */}
      <div className="mb-10 flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-light tracking-tight">Campus <span className="font-bold">Digital Twin</span></h1>
          <div className="mt-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <Globe size={12} className="text-emerald-500" /> System Active • Live IoT Stream • Blockchain Ready
          </div>
        </div>
        <button onClick={exportAudit} className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-xs font-bold text-white transition-all hover:bg-slate-800 shadow-lg">
          <Download size={14} /> Download Audit Report
        </button>
      </div>

      {/* High-Performance Metrics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Metric title="Network Demand" value={`${live.total_load} kW`} detail="Real-time Consumption" icon={<Zap size={16} />} color="blue" />
        <Metric title="Renewable Offset" value={`${live.solar_gen} kW`} detail={`${Math.round((live.solar_gen / live.total_load) * 100)}% Renewable`} icon={<Sun size={16} />} color="emerald" />
        <Metric title="External Import" value={`${Math.round(live.total_load - live.solar_gen)} kW`} detail="Grid Dependency" icon={<Battery size={16} />} color="slate" />
        <Metric title="Critical Node" value={live.peak_zone.replace('_', ' ')} detail={`${live.peak_value} kW Demand`} icon={<AlertCircle size={16} />} color="red" />
      </div>

      <div className="mt-8 grid grid-cols-12 gap-6">
        {/* Real-time Telemetry Graph */}
        <div className="col-span-12 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm lg:col-span-8">
          <div className="mb-8 flex items-center justify-between font-bold uppercase tracking-widest text-[10px] text-slate-400">
            <h3>Live Telemetry Feed</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-blue-500" /> Load</span>
              <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-emerald-500" /> Solar</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={graph}>
              <defs>
                <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="t" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }} />
              <Area type="monotone" dataKey="load" stroke="#3b82f6" fill="url(#colorLoad)" strokeWidth={3} dot={false} />
              <Area type="monotone" dataKey="solar" stroke="#10b981" fill="transparent" strokeWidth={3} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Model Prediction Panel */}
        <div className="col-span-12 space-y-6 lg:col-span-4">
          <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
            <h3 className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <ShieldCheck size={16} className="text-emerald-400" /> Linear Regression Analysis
            </h3>
            {modelResult && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs text-slate-500 uppercase font-bold mb-1">Baseline Load</div>
                  <div className="text-xl font-medium opacity-80">{modelResult.current_consumption} kW</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-bold mb-1">Model Predicted Demand</div>
                  <div className="text-3xl font-bold tracking-tighter text-emerald-400">
                    {Math.round(modelResult.predicted_consumption)} kW
                  </div>
                </div>
                <div className="h-px bg-slate-800 w-full" />
                <p className="text-[11px] leading-relaxed text-slate-400 italic font-medium">
                  "The model predicts a grid offset of {modelResult.estimated_reduction} kW via {solarKW} kW solar expansion."
                </p>
                <div>
                  <input type="range" min="100" max="1000" step="50" value={solarKW} onChange={(e) => setSolarKW(Number(e.target.value))} className="w-full h-1 bg-slate-800 appearance-none cursor-pointer accent-emerald-400" />
                  <div className="mt-2 flex justify-between text-[9px] font-bold text-slate-500 uppercase"><span>Current</span><span>Target: {solarKW}kW</span></div>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Strategic Recommendations</h4>
            <ul className="space-y-4">
              <Insight title="Load Balancing" text="Schedule heavy research tasks during peak solar yield (11:00-14:00)." />
              <Insight title="Redistribution" text="Peak load in Engineering Labs detected. Divert excess solar from Block A." />
            </ul>
          </div>
        </div>
      </div>

      {/* Historical Audit Trend */}
      <div className="mt-8 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
          <BarChart3 size={18} /> 6-Month Sustainability Audit
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={history}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="month" fontSize={10} axisLine={false} tickLine={false} />
            <YAxis fontSize={10} axisLine={false} tickLine={false} />
            <Bar dataKey="consumption" fill="#e2e8f0" radius={[6, 6, 0, 0]} name="Grid Import" />
            <Bar dataKey="solar" fill="#10b981" radius={[6, 6, 0, 0]} name="Solar Contribution" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Metric({ title, value, detail, icon, color }: any) {
  const colors: any = { blue: "bg-blue-50 text-blue-600", emerald: "bg-emerald-50 text-emerald-600", slate: "bg-slate-50 text-slate-600", red: "bg-red-50 text-red-600" };
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm hover:border-slate-300 transition-all">
      <div className="mb-4 flex items-center justify-between uppercase text-[10px] font-bold text-slate-400 tracking-widest">
        {title} <div className={`rounded-xl p-2 ${colors[color]}`}>{icon}</div>
      </div>
      <div className="text-2xl font-black tracking-tight">{value}</div>
      <div className="mt-1 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{detail}</div>
    </div>
  );
}

function Insight({ title, text }: any) {
  return (
    <li className="flex gap-3">
      <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
      <div>
        <div className="text-[10px] font-bold uppercase text-slate-800">{title}</div>
        <p className="text-[10px] leading-relaxed text-slate-500">{text}</p>
      </div>
    </li>
  );
}


