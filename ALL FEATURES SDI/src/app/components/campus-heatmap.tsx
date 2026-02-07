import React, { useState } from 'react';
import { buildingStats } from '../data/building-stats';

export function CampusHeatmap() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const hotspots = [
    { id: 'AcademicBuildings', label: 'Academic Hub', x: 50, y: 45 },
    { id: 'AdminAndOthers', label: 'Solar Farm', x: 70, y: 25 },
    { id: 'Hostels', label: 'Residential Zone', x: 20, y: 60 },
    { id: 'Cafeteria', label: 'Central Plaza', x: 50, y: 75 },
    { id: 'Research', label: 'Research Park', x: 80, y: 55 },
  ];

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-slate-50 via-stone-50 to-slate-100 rounded-3xl border border-stone-200 overflow-hidden shadow-xl">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Stylized Campus Map */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Main Road Network */}
        <path 
          d="M 10 50 Q 30 45, 50 48 T 90 50" 
          fill="none" 
          stroke="#cbd5e1" 
          strokeWidth="3"
          className="opacity-60"
        />
        <path 
          d="M 50 10 L 50 90" 
          fill="none" 
          stroke="#cbd5e1" 
          strokeWidth="2"
          strokeDasharray="2 2"
          className="opacity-40"
        />
        
        {/* Academic Buildings Complex */}
        <g className="transition-all duration-300 hover:opacity-80">
          <rect x="45" y="40" width="10" height="10" rx="1" fill="#475569" opacity="0.7"/>
          <rect x="47" y="42" width="3" height="3" fill="#f1f5f9" opacity="0.5"/>
          <rect x="51" y="42" width="3" height="3" fill="#f1f5f9" opacity="0.5"/>
        </g>

        {/* Solar Farm */}
        <g className="transition-all duration-300 hover:opacity-80">
          <circle cx="70" cy="25" r="4" fill="#fbbf24" opacity="0.6"/>
          <circle cx="73" cy="27" r="3" fill="#fbbf24" opacity="0.5"/>
          <circle cx="67" cy="27" r="3" fill="#fbbf24" opacity="0.5"/>
        </g>

        {/* Residential Zone */}
        <g className="transition-all duration-300 hover:opacity-80">
          <rect x="17" y="56" width="6" height="8" rx="0.5" fill="#64748b" opacity="0.7"/>
          <rect x="24" y="57" width="5" height="7" rx="0.5" fill="#64748b" opacity="0.6"/>
          <rect x="18" y="65" width="4" height="5" rx="0.5" fill="#64748b" opacity="0.5"/>
        </g>

        {/* Central Plaza */}
        <g className="transition-all duration-300 hover:opacity-80">
          <circle cx="50" cy="75" r="5" fill="#10b981" opacity="0.4"/>
          <circle cx="50" cy="75" r="3" fill="#10b981" opacity="0.6"/>
        </g>

        {/* Research Park */}
        <g className="transition-all duration-300 hover:opacity-80">
          <rect x="77" y="52" width="7" height="7" rx="1" fill="#6366f1" opacity="0.7"/>
          <rect x="78.5" y="54" width="2" height="2" fill="#e0e7ff" opacity="0.6"/>
        </g>

        {/* Green Spaces */}
        <circle cx="30" cy="30" r="6" fill="#22c55e" opacity="0.2"/>
        <ellipse cx="65" cy="70" rx="8" ry="5" fill="#22c55e" opacity="0.2"/>
        <circle cx="85" cy="35" r="4" fill="#22c55e" opacity="0.2"/>
      </svg>

      {/* Interactive Hotspot Markers */}
      {hotspots.map((spot) => (
        <div
          key={spot.id}
          style={{ 
            top: `${spot.y}%`, 
            left: `${spot.x}%`,
            transform: 'translate(-50%, -50%)'
          }}
          className="absolute z-10"
        >
          <button
            onMouseEnter={() => setActiveId(spot.id)}
            onMouseLeave={() => setActiveId(null)}
            onClick={() => setActiveId(activeId === spot.id ? null : spot.id)}
            className="relative group focus:outline-none"
          >
            {/* Pulse Animation Ring */}
            <div className={`absolute inset-0 rounded-full transition-all duration-700 ${
              activeId === spot.id 
                ? 'w-16 h-16 -top-6 -left-6 border-2 border-stone-800 bg-stone-800/5 animate-pulse' 
                : 'w-12 h-12 -top-4 -left-4 border border-stone-300'
            }`} />
            
            {/* Core Marker */}
            <div className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
              activeId === spot.id 
                ? 'bg-stone-900 scale-125 shadow-lg' 
                : 'bg-stone-500 group-hover:bg-stone-700 group-hover:scale-110'
            }`}>
              {/* Inner Glow */}
              <div className={`absolute inset-0 rounded-full bg-white transition-opacity duration-300 ${
                activeId === spot.id ? 'opacity-30' : 'opacity-0'
              }`} />
            </div>

            {/* Floating Label */}
            <span className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 bg-stone-900 text-white text-xs font-semibold rounded-lg shadow-xl transition-all duration-300 ${
              activeId === spot.id 
                ? '-top-12 opacity-100' 
                : '-top-10 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:-top-12'
            }`}>
              {spot.label}
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-stone-900" />
            </span>
          </button>
        </div>
      ))}

      {/* Data Overlay Card */}
      <div className={`absolute bottom-6 right-6 w-80 bg-white/95 backdrop-blur-lg border border-stone-200 rounded-2xl shadow-2xl transition-all duration-500 ${
        activeId ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
      }`}>
        {activeId && buildingStats[activeId] && (
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-stone-900 font-bold text-lg mb-1">
                  {hotspots.find(h => h.id === activeId)?.label}
                </h3>
                <p className="text-stone-500 text-xs uppercase tracking-wider">Live Metrics</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-green-600 font-medium">Active</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="space-y-4">
              {/* SDG Score */}
              <div className="bg-gradient-to-br from-stone-50 to-stone-100 rounded-xl p-4 border border-stone-200">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-stone-500 text-xs font-medium uppercase tracking-wide mb-1">
                      SDG Compliance
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-stone-900">
                        {buildingStats[activeId].sdg}
                      </span>
                      <span className="text-lg text-stone-500">%</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="mt-3 h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000 ease-out"
                    style={{ width: `${buildingStats[activeId].sdg}%` }}
                  />
                </div>
              </div>

              {/* Energy Consumption */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-700 text-xs font-medium uppercase tracking-wide mb-1">
                      Energy Load
                    </p>
                    <span className="text-2xl font-bold text-amber-900 font-mono">
                      {buildingStats[activeId].energy}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Header Branding */}
      <div className="absolute top-6 left-6 z-20">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-stone-200">
          <h1 className="text-stone-900 font-bold text-2xl tracking-tight leading-none">
            Campus Digital Twin
          </h1>
          <p className="text-stone-500 text-xs font-medium tracking-wider mt-1 uppercase">
            Real-Time Sustainability Monitor
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-stone-200">
        <p className="text-stone-400 text-xs font-medium uppercase tracking-wider mb-2">Map Legend</p>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-stone-500" />
            <span className="text-xs text-stone-600">Zones</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-stone-600">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}