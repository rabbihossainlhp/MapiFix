import React from "react";
import { BarChart3, FileText, Settings, Users } from "lucide-react";

const statsConfig = [
  {
    key: "open",
    title: "Open Issues",
    color: "from-red-500 to-red-600",
    textColor: "text-red-100",
    icon: FileText
  },
  {
    key: "inProgress",
    title: "In Progress",
    color: "from-yellow-500 to-yellow-600",
    textColor: "text-yellow-100",
    icon: Settings
  },
  {
    key: "resolved",
    title: "Resolved",
    color: "from-green-500 to-green-600",
    textColor: "text-green-100",
    icon: BarChart3
  },
  {
    key: "total",
    title: "Total Reports",
    color: "from-blue-500 to-blue-600",
    textColor: "text-blue-100",
    icon: Users
  } 
];

export default function StatsCards({ stats = {} }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {statsConfig.map((config) => (
        <div key={config.key} className={`bg-gradient-to-br ${config.color} text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg`}>
          <div className="flex justify-between items-start">
            <div>
              <p className={`${config.textColor} text-sm sm:text-base`}>{config.title}</p>
              <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{stats[config.key] || 0}</p>
            </div>
            <div className="bg-white/20 p-2 sm:p-3 rounded-lg sm:rounded-xl">
              <config.icon className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
          </div>
          {config.key !== "total" ? (
            <div className="mt-3 sm:mt-4 h-1.5 sm:h-2 bg-white/30 rounded-full">
              <div 
                className="h-full bg-white rounded-full" 
                style={{ width: `${(stats[config.key] / stats.total) * 100}%` }}
              ></div>
            </div>
          ) : (
            <div className="mt-3 sm:mt-4 text-blue-100 text-xs sm:text-sm">
              +2 from yesterday
            </div>
          )}
        </div>
      ))}
    </div>
  );
}