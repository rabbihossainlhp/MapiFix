import React, { useState, useEffect, useRef } from "react";
import { Search, Filter, Eye, Edit, Trash2, Download, MoreVertical, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { updateReportStatus } from "../../services/apiService";

const statusColor = (status) => {
  const colors = {
    "open": "bg-red-100 text-red-800 border-red-200",
    "in progress": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "in-progress": "bg-yellow-100 text-yellow-800 border-yellow-200", // Keep both for backward compatibility
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

// Report Action Menu Component
const ReportActionMenu = ({ report, onStatusUpdate }) => {
  const [showActions, setShowActions] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const actionMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setShowActions(false);
      }
    };

    if (showActions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showActions]);

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    try {
      console.log(`Changing status of report ${report._id} to ${newStatus}`);
      
      // Call API to update status
      const response = await updateReportStatus(report._id, newStatus);
      console.log('Status updated successfully:', response);
      
      // Show success message
      console.log(`✅ Report status changed to "${newStatus}" successfully!`);
      
      // Trigger parent component to refresh the reports list immediately
      if (onStatusUpdate) {
        console.log('🔄 Refreshing reports data...');
        await onStatusUpdate();
      }
      
    } catch (error) {
      console.error('Failed to update report status:', error);
      alert(`❌ Failed to update status: ${error.message}`);
    } finally {
      setIsUpdating(false);
      setShowActions(false);
    }
  };

  return (
    <div className="flex items-center space-x-1 sm:space-x-2">
      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
        <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
      </button>
      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
        <Edit className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
      </button>
      <div className="relative" ref={actionMenuRef}>
        <button 
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          onClick={() => setShowActions(!showActions)}
        >
          <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
        </button>
        
        {showActions && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            <div className="py-1">
              <button
                onClick={() => handleStatusChange('in progress')}
                disabled={isUpdating}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Clock className="w-4 h-4 text-yellow-500" />
                <span>{isUpdating ? 'Updating...' : 'Mark In Progress'}</span>
              </button>
              <button
                onClick={() => handleStatusChange('resolved')}
                disabled={isUpdating}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>{isUpdating ? 'Updating...' : 'Mark Resolved'}</span>
              </button>
              <button
                onClick={() => handleStatusChange('open')}
                disabled={isUpdating}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span>{isUpdating ? 'Updating...' : 'Mark Open'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function AllReportsPage({ reports = [], loading = false, onRefresh, onReportClick }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const exportToCSV = () => {
    const csvContent = [
      // CSV Header
      ['ID', 'Title', 'Location', 'Priority', 'Status', 'Reporter', 'Date', 'Description'].join(','),
      // CSV Rows
      ...filteredReports.map(report => [
        report._id?.slice(-6) || report.id,
        `"${report.title || ''}"`,
        `"${report.location || ''}"`,
        report.priority || '',
        report.status || '',
        `"${report.reporter?.username || report.reporter?.name || 'Unknown'}"`,
        report.createdAt ? new Date(report.createdAt).toLocaleDateString() : (report.date || 'N/A'),
        `"${(report.description || '').replace(/"/g, '""')}"` // Escape quotes
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `all_reports_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Debug: Log the actual structure of reports data
  useEffect(() => {
    if (reports.length > 0) {
      console.log('AllReportsPage - Sample report structure:', reports[0]);
      console.log('AllReportsPage - Reporter structure:', reports[0]?.reporter);
    }
  }, [reports]);

  const filteredReports = reports.filter(report => {
    const reporterName = report.reporter?.username || report.reporter?.name || '';
    const matchesSearch = report.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reporterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reporter?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || report.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    total: reports.length,
    open: reports.filter(r => r.status === "open").length,
    inProgress: reports.filter(r => r.status === "in progress" || r.status === "in-progress").length,
    resolved: reports.filter(r => r.status === "resolved").length,
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">All Reports</h1>
          <p className="text-gray-600">Manage and track all maintenance reports</p>
        </div>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh
          </button>
        )}
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
              <option value="in progress">In Progress</option>
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
          <button 
            onClick={exportToCSV}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex-1 lg:flex-none justify-center"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
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
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    {reports.length === 0 ? "No reports found in the system" : "No reports match your search criteria"}
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => (
                  <tr 
                    key={report._id || report.id} 
                    className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                    onClick={() => onReportClick && onReportClick(report._id || report.id)}
                  >
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">{report.title}</p>
                        <div className="md:hidden mt-1 text-xs text-gray-500">
                          {report.reporter?.username || report.reporter?.name || 'Unknown'} • {report.location}
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                      <span className="text-gray-700 text-sm sm:text-base">{report.reporter?.username || report.reporter?.name || 'Unknown'}</span>
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
                  <td className="hidden sm:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-gray-600 text-sm sm:text-base">
                    {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : (report.date || 'N/A')}
                  </td>
                  <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${statusColor(report.status)}`}>
                      {report.status.replace("-", " ")}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4" onClick={(e) => e.stopPropagation()}>
                    <ReportActionMenu report={report} onStatusUpdate={onRefresh} />
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}