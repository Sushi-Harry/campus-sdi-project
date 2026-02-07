import { FlaskConical } from "lucide-react";

export function SimulationIndicator() {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-sm border border-purple-200 p-5">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-purple-100 rounded-lg">
          <FlaskConical className="w-5 h-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900 mb-0.5">
            What-If Simulation Active
          </div>
          <div className="text-xs text-gray-600">
            Scenario: +20% Solar Capacity, +15% Green Cover
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div>
            <div className="text-gray-500">Projected Impact</div>
            <div className="text-emerald-600 font-medium mt-0.5">−24% Carbon Reduction</div>
          </div>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            View Details
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Apply Scenario
          </button>
        </div>
      </div>
    </div>
  );
}
