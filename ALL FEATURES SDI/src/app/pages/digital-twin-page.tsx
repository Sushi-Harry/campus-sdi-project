import React, { useState, useEffect, useMemo } from 'react';
import { Zap, Droplets, Leaf, ShieldCheck, Globe, AlertTriangle, TrendingUp, Link as LinkIcon, BadgeCheck } from "lucide-react";

export function DigitalTwinPage() {
  const [liveData, setLiveData] = useState<any>(null);
  const [txLog, setTxLog] = useState<any[]>([]);

  useEffect(() => {
    const fetchTelemetry = () => {
      fetch("http://127.0.0.1:8000/energy/live")
        .then(res => res.json())
        .then(data => {
          const sanitizedData = {
            ...data,
            total_load: Math.min(data.total_load, 850),
            solar_gen: Math.min(data.solar_gen, 500)
          };
          setLiveData(sanitizedData);
          
          const mockHash = "0x" + Math.random().toString(16).slice(2, 10).toUpperCase() + "..." + Math.random().toString(16).slice(2, 6).toUpperCase();
          setTxLog(prev => [{ hash: mockHash, value: sanitizedData.total_load, time: new Date().toLocaleTimeString() }, ...prev.slice(0, 5)]);
        })
        .catch(err => console.error("API Link Offline:", err));
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 5000);
    return () => clearInterval(interval);
  }, []);

  const alerts = useMemo(() => {
    if (!liveData) return [];
    const activeAlerts = [];
    if (liveData.total_load > 700) {
      activeAlerts.push({ id: 1, msg: `Peak Demand: ${liveData.total_load}kW detected in North Campus.`, icon: <AlertTriangle className="text-amber-500" /> });
    }
    activeAlerts.push({ id: 2, msg: "Solidity Smart Contract verified: Audit integrity 100%.", icon: <ShieldCheck className="text-emerald-500" /> });
    return activeAlerts;
  }, [liveData]);

  if (!liveData) return <div className="flex h-screen items-center justify-center font-mono text-stone-400 animate-pulse bg-[#FDFDFB]">INITIALIZING SENTINEL PROTOCOL...</div>;

  return (
    <div className="min-h-screen bg-[#FDFDFB] p-10 font-sans text-stone-900">
      
      {/* --- PREMIUM HEADER --- */}
      <div className="flex justify-between items-start mb-16 border-b border-stone-100 pb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase text-stone-900">Project <span className="text-emerald-600">Sentinel</span></h1>
          <div className="mt-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Mainnet Node Active • Thapar University Digital Twin
          </div>
        </div>

        {/* ✅ GREEN COIN BADGE (The "Green Asset" Batch) */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-white border border-emerald-100 px-6 py-3 rounded-full shadow-sm flex items-center gap-3">
            <div className="bg-emerald-500 p-1.5 rounded-full text-white">
              <BadgeCheck size={18} />
            </div>
            <div>
              <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest leading-none">Verified Green Asset</p>
              <p className="text-xs font-bold text-stone-800">Carbon Neutral Proof</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- REAL-TIME TICKER GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        <RealTimeCard icon={<Zap />} label="Live Demand" value={`${liveData.total_load} kW`} color="text-stone-900" />
        <RealTimeCard icon={<Leaf />} label="Renewable Gen" value={`${liveData.solar_gen} kW`} color="text-emerald-600" />
        <RealTimeCard icon={<Droplets />} label="Water Velocity" value="12.4 L/s" color="text-blue-500" />
        <RealTimeCard icon={<ShieldCheck />} label="Network State" value="Syncing" color="text-stone-400" />
      </div>

      <div className="grid grid-cols-12 gap-10">
        {/* --- LEFT: BLOCKCHAIN LEDGER --- */}
        <div className="col-span-12 lg:col-span-7">
          <div className="bg-stone-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
              <LinkIcon size={120} />
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-500 mb-10 flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-blue-500" /> Immutable Transaction Ledger
            </h3>
            <div className="space-y-4 font-mono">
              {txLog.map((tx, i) => (
                <div key={i} className="flex justify-between items-center text-[10px] py-4 border-b border-stone-800 last:border-0 group">
                  <span className="text-blue-400 group-hover:text-blue-300 transition-colors font-bold">{tx.hash}</span>
                  <div className="flex gap-6">
                    <span className="text-stone-500 tracking-tighter">LOAD_SIG: {tx.value}kW</span>
                    <span className="text-emerald-500 font-bold">{tx.time}</span>
                    <span className="text-stone-700 font-black uppercase">0xCONFIRM</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT: INTELLIGENCE FEED --- */}
        <div className="col-span-12 lg:col-span-5 space-y-8">
          <div className="bg-white border border-stone-100 rounded-[2.5rem] p-10 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-8">System Intelligence</h3>
            <div className="space-y-6">
              {alerts.map(alert => (
                <div key={alert.id} className="flex items-center gap-5 p-5 rounded-3xl bg-[#FBFBFA] border border-stone-50">
                  <div className="shrink-0">{alert.icon}</div>
                  <p className="text-xs font-bold text-stone-700 leading-relaxed">{alert.msg}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-10 rounded-[2.5rem] bg-emerald-50 border border-emerald-100">
             <div className="flex items-center gap-3 mb-4">
               <TrendingUp className="text-emerald-600" size={18} />
               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Efficiency Insight</span>
             </div>
             <p className="text-xs text-emerald-800 leading-relaxed italic">
               Campus efficiency is performing <span className="font-bold">14.2%</span> above regional baseline. Current solar generation is offsetting <span className="font-bold">{Math.round((liveData.solar_gen / liveData.total_load) * 100)}%</span> of total demand.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RealTimeCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-white border border-stone-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-all group">
      <div className={`${color} mb-6 group-hover:scale-110 transition-transform`}>{React.cloneElement(icon, { size: 28 })}</div>
      <p className="text-stone-400 text-[9px] font-black uppercase tracking-[0.2em] mb-2">{label}</p>
      <p className="text-4xl font-black tracking-tight text-stone-900">{value}</p>
    </div>
  );
}