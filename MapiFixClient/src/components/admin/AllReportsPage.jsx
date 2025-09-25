import React, { useState } from "react";
import { Search, Filter, Eye, Edit, Trash2, Download, MoreVertical } from "lucide-react";

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

// Extended dummy reports for All Reports page
const allReports = [
  { id: 1, title: "Light not working", location: "CSE 302", status: "open", date: "2024-01-15", priority: "high", reporter: "John Doe" },
  { id: 2, title: "AC broken", location: "EEE 101", status: "in-progress", date: "2024-01-14", priority: "medium", reporter: "Jane Smith" },
  { id: 3, title: "Leaking tap", location: "Civil Lab", status: "resolved", date: "2024-01-13", priority: "low", reporter: "Mike Johnson" },
  { id: 4, title: "Broken chair", location: "Library", status: "open", date: "2024-01-16", priority: "medium", reporter: "Sarah Wilson" },
  { id: 5, title: "Projector issue", location: "MBA 205", status: "in-progress", date: "2024-01-12", priority: "high", reporter: "Alice Brown" },
  { id: 6, title: "WiFi not working", location: "CSE 201", status: "resolved", date: "2024-01-11", priority: "high", reporter: "Bob Davis" },
  { id: 7, title: "Window broken", location: "Physics Lab", status: "open", date: "2024-01-17", priority: "medium", reporter: "Emma Wilson" },
  { id: 8, title: "Printer jam", location: "Admin Office", status: "resolved", date: "2024-01-10", priority: "low", reporter: "Chris Lee" },
];

export default function AllReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredReports = allReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reporter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || report.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    total: allReports.length,
    open: allReports.filter(r => r.status === "open").length,
    inProgress: allReports.filter(r => r.status === "in-progress").length,
    resolved: allReports.filter(r => r.status === "resolved").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">All Reports</h1>
        <p className="text-gray-600">Manage and track all maintenance reports</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-lg">
          <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Reports</div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-lg">
          <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1">{stats.open}</div>
          <div className="text-sm text-gray-600">Open</div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-lg">
          <div className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-1">{stats.inProgress}</div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-lg">
          <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">{stats.resolved}</div>
          <div className="text-sm text-gray-600">Resolved</div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 flex-1 sm:flex-none"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 flex-1 sm:flex-none"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 w-full lg:w-auto">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex-1 lg:flex-none justify-center">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex-1 lg:flex-none justify-center">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Issue</th>
                <th className="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Reporter</th>
                <th className="hidden lg:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Location</th>
                <th className="hidden lg:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Priority</th>
                <th className="hidden sm:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Date</th>
                <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Status</th>
                <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <div>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{report.title}</p>
                      <p className="text-xs sm:text-sm text-gray-500">ID: #{report.id}</p>
                      <div className="md:hidden mt-1 text-xs text-gray-500">
                        {report.reporter} • {report.location}
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <span className="text-gray-700 text-sm sm:text-base">{report.reporter}</span>
                  </td>
                  <td className="hidden lg:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <span className="text-gray-700 text-sm sm:text-base">{report.location}</span>
                  </td>
                  <td className="hidden lg:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${priorityColor(report.priority)}`}></div>
                      <span className="capitalize text-gray-700 text-sm sm:text-base">{report.priority}</span>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-gray-600 text-sm sm:text-base">{report.date}</td>
                  <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${statusColor(report.status)}`}>
                      {report.status.replace("-", " ")}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}