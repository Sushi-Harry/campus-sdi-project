import { TrendingUp, TrendingDown } from "lucide-react";

export function KPICards() {
  const kpis = [
    {
      label: "SDG Sustainability Score",
      value: "74",
      unit: "/ 100",
      change: "+3.2",
      trend: "up",
      description: "Sustainable Development Goals",
      color: "emerald",
      progress: 74
    },
    {
      label: "Solar Energy Offset",
      value: "41",
      unit: "%",
      change: "+4.8",
      trend: "up",
      description: "Renewable energy contribution",
      color: "amber",
      progress: 41
    },
    {
      label: "Water Reuse Efficiency",
      value: "46",
      unit: "%",
      change: "+2.1",
      trend: "up",
      description: "Recycled water utilization",
      color: "blue",
      progress: 46
    },
    {
      label: "Carbon Reduction (YoY)",
      value: "18",
      unit: "%",
      change: "−18",
      trend: "down",
      description: "Year-over-year emissions",
      color: "emerald",
      progress: 82
    }
  ];

  const getColorClasses = (color: string) => {
    switch(color) {
      case "emerald": 
        return {
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          text: "text-emerald-700",
          progress: "bg-emerald-500"
        };
      case "amber": 
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-700",
          progress: "bg-amber-500"
        };
      case "blue": 
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-700",
          progress: "bg-blue-500"
        };
      default: 
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "text-gray-700",
          progress: "bg-gray-500"
        };
    }
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      {kpis.map((kpi, idx) => {
        const colors = getColorClasses(kpi.color);
        return (
          <div 
            key={idx}
            className={`${colors.bg} border ${colors.border} rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="text-xs text-gray-600 mb-3 uppercase tracking-wide">{kpi.label}</div>
            
            <div className="flex items-baseline gap-1.5 mb-3">
              <span className={`text-3xl font-semibold ${colors.text}`}>{kpi.value}</span>
              <span className="text-sm text-gray-500">{kpi.unit}</span>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500">{kpi.description}</span>
              <div className={`flex items-center gap-1 text-xs font-medium ${
                kpi.trend === "up" && kpi.label.includes("Carbon") 
                  ? "text-red-600" 
                  : kpi.trend === "up" 
                  ? "text-emerald-600" 
                  : "text-emerald-600"
              }`}>
                {kpi.trend === "up" && !kpi.label.includes("Carbon") ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                <span>{kpi.change}</span>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="h-1.5 bg-white rounded-full overflow-hidden">
              <div 
                className={`h-full ${colors.progress} rounded-full transition-all duration-500`}
                style={{ width: `${kpi.progress}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
