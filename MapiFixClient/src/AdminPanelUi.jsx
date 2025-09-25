import React, { useState } from "react";
import { 
  BarChart3, 
  FileText, 
  LogOut, 
  Settings, 
  Users, 
  Bell, 
  Search,
  Filter,
  Download,
  MoreVertical
} from "lucide-react";

const dummyReports = [
  { id: 1, title: "Light not working", location: "CSE 302", status: "open", date: "2024-01-15", priority: "high" },
  { id: 2, title: "AC broken", location: "EEE 101", status: "in-progress", date: "2024-01-14", priority: "medium" },
  { id: 3, title: "Leaking tap", location: "Civil Lab", status: "resolved", date: "2024-01-13", priority: "low" },
  { id: 4, title: "Broken chair", location: "Library", status: "open", date: "2024-01-16", priority: "medium" },
  { id: 5, title: "Projector issue", location: "MBA 205", status: "in-progress", date: "2024-01-12", priority: "high" },
];

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

export default function AdminPanelUI() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = dummyReports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    open: dummyReports.filter(r => r.status === "open").length,
    inProgress: dummyReports.filter(r => r.status === "in-progress").length,
    resolved: dummyReports.filter(r => r.status === "resolved").length,
    total: dummyReports.length
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Sidebar */}
      <div className="w-80 bg-gradient-to-b from-blue-600 to-purple-700 text-white shadow-2xl">
        <div className="p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">MapiFix Admin</h1>
              <p className="text-blue-200 text-sm">Administrator Panel</p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { icon: BarChart3, label: "Dashboard", id: "dashboard" },
              { icon: FileText, label: "All Reports", id: "reports" },
              { icon: Users, label: "Users", id: "users" },
              { icon: Settings, label: "Settings", id: "settings" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id 
                    ? "bg-white/20 backdrop-blur-md shadow-lg" 
                    : "hover:bg-white/10"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-80 p-6 border-t border-white/20">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2 rounded-xl bg-white/80 backdrop-blur-md border border-gray-200 hover:shadow-lg transition-shadow">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-100">Open Issues</p>
                <p className="text-3xl font-bold mt-2">{stats.open}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <FileText className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-white/30 rounded-full">
              <div 
                className="h-full bg-white rounded-full" 
                style={{ width: `${(stats.open / stats.total) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-yellow-100">In Progress</p>
                <p className="text-3xl font-bold mt-2">{stats.inProgress}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <Settings className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-white/30 rounded-full">
              <div 
                className="h-full bg-white rounded-full" 
                style={{ width: `${(stats.inProgress / stats.total) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100">Resolved</p>
                <p className="text-3xl font-bold mt-2">{stats.resolved}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-white/30 rounded-full">
              <div 
                className="h-full bg-white rounded-full" 
                style={{ width: `${(stats.resolved / stats.total) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100">Total Reports</p>
                <p className="text-3xl font-bold mt-2">{stats.total}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 text-blue-100 text-sm">
              +2 from yesterday
            </div>
          </div>
        </div>

        {/* Enhanced Reports Table */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Recent Reports</h2>
              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Issue</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Priority</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{report.title}</p>
                        <p className="text-sm text-gray-500">ID: #{report.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{report.location}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${priorityColor(report.priority)}`}></div>
                        <span className="capitalize text-gray-700">{report.priority}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{report.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusColor(report.status)}`}>
                        {report.status.replace("-", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}