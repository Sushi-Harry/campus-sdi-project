import { Map, Zap, Droplets, Recycle, Leaf, Target } from "lucide-react";
import { PageType } from "@/app/App";

interface SidebarProps {
  activePage: PageType;
  onPageChange: (page: PageType) => void;
}

export function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const navItems: { icon: typeof Map; label: PageType }[] = [
    { icon: Map, label: "Digital Twin" },
    { icon: Zap, label: "Energy" },
    { icon: Droplets, label: "Water" },
    { icon: Recycle, label: "Waste" },
    { icon: Leaf, label: "Carbon" },
    { icon: Target, label: "SDG Impact" },
  ];

  return (
    <aside className="fixed left-0 top-[73px] bottom-0 w-64 bg-white border-r border-gray-200 p-4">
      <nav className="space-y-1">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activePage === item.label;
          return (
            <button
              key={idx}
              onClick={() => onPageChange(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-emerald-50 text-emerald-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="mt-8 p-4 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg border border-emerald-100">
        <div className="text-xs text-gray-600 mb-2">System Status</div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Active Sensors</span>
            <span className="text-gray-900 font-medium">1,247</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Data Points/hr</span>
            <span className="text-gray-900 font-medium">74.2K</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Uptime</span>
            <span className="text-emerald-600 font-medium">99.8%</span>
          </div>
        </div>
      </div>
    </aside>
  );
}