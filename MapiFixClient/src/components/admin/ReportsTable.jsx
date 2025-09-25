import React from "react";
import { Filter, Download, MoreVertical } from "lucide-react";

const statusColor = (status) => {
  const colors = {
    "open": "bg-red-100 text-red-800 border-red-200",
    "in-progress": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "resolved": "bg-green-100 text-green-800 border-green-200"
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const priorityColor = (priority) => {
  const colors = {
    "high": "bg-red-500",
    "medium": "bg-orange-500",
    "low": "bg-blue-500"
  };
  return colors[priority] || "bg-gray-500";
};

export default function ReportsTable({ reports }) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Recent Reports</h2>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button className="flex items-center justify-center sm:justify-start space-x-2 px-3 sm:px-4 py-2 border border-gray-200 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors text-sm sm:text-base">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center justify-center sm:justify-start space-x-2 px-3 sm:px-4 py-2 border border-gray-200 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors text-sm sm:text-base">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/80">
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Issue</th>
              <th className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Location</th>
              <th className="hidden lg:table-cell px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Priority</th>
              <th className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Date</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Status</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">{report.title}</p>
                    <p className="text-xs sm:text-sm text-gray-500">ID: #{report.id}</p>
                    <div className="md:hidden mt-1 text-xs text-gray-500">{report.location}</div>
                  </div>
                </td>
                <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4">
                  <span className="text-gray-700 text-sm sm:text-base">{report.location}</span>
                </td>
                <td className="hidden lg:table-cell px-3 sm:px-6 py-3 sm:py-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${priorityColor(report.priority)}`}></div>
                    <span className="capitalize text-gray-700 text-sm sm:text-base">{report.priority}</span>
                  </div>
                </td>
                <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-gray-600 text-sm sm:text-base">{report.date}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${statusColor(report.status)}`}>
                    {report.status.replace("-", " ")}
                  </span>
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <button className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}