import { LayoutDashboard, ChartBar, FlaskConical, Settings } from "lucide-react";

export function TopNav() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <h1 className="text-xl text-gray-900">Campus-SDI</h1>
          </div>
          
          {/* Center Title */}
          <div className="text-center">
            <h2 className="text-gray-900"> Campus Digital Twin</h2>
            <p className="text-xs text-gray-500 mt-0.5">Real-time sustainability monitoring & analytics</p>
          </div>
          
          {/* Right Navigation */}
          <div className="flex items-center gap-1">
            <button className="px-4 py-2 text-sm text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>
            <button className="px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <ChartBar className="w-4 h-4" />
              <span>Analytics</span>
            </button>
            <button className="px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <FlaskConical className="w-4 h-4" />
              <span>Simulations</span>
            </button>
            <button className="px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}