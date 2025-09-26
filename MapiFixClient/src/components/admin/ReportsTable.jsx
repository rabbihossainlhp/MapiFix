import React, { useState, useEffect, useRef } from "react";
import { Filter, Download, MoreVertical, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
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

// Individual Report Row Component with Action Menu
const ReportRow = ({ report, priorityColor, statusColor, onStatusUpdate, onReportClick }) => {
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

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString || 'N/A';
    }
  };

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    try {
      console.log(`Changing status of report ${report._id || report.id} to ${newStatus}`);
      
      // Call API to update status
      const response = await updateReportStatus(report._id || report.id, newStatus);
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
    <tr 
      className="hover:bg-gray-50/50 transition-colors cursor-pointer"
      onClick={() => onReportClick && onReportClick(report._id || report.id)}
    >
      <td className="px-3 sm:px-6 py-3 sm:py-4">
        <div>
          <p className="font-medium text-gray-900 text-sm sm:text-base">{report.title}</p>
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
      <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-gray-600 text-sm sm:text-base">
        {formatDate(report.createdAt || report.date)}
      </td>
      <td className="px-3 sm:px-6 py-3 sm:py-4">
        <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${statusColor(report.status)}`}>
          {report.status.replace("-", " ")}
        </span>
      </td>
      <td className="px-3 sm:px-6 py-3 sm:py-4 relative">
        <div ref={actionMenuRef} onClick={(e) => e.stopPropagation()}>
          <button 
            className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setShowActions(!showActions);
            }}
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
      </td>
    </tr>
  );
};

export default function ReportsTable({ reports, onStatusUpdate, onReportClick }) {
  const exportToCSV = () => {
    const csvContent = [
      // CSV Header
      ['ID', 'Title', 'Location', 'Priority', 'Status', 'Reporter', 'Date', 'Description'].join(','),
      // CSV Rows
      ...reports.slice(0, 15).map(report => [
        report._id?.slice(-6) || report.id,
        `"${report.title || ''}"`,
        `"${report.location || ''}"`,
        report.priority || '',
        report.status || '',
        `"${report.reporter?.username || report.reporter?.name || 'Unknown'}"`,
        new Date(report.createdAt || report.date).toLocaleDateString(),
        `"${(report.description || '').replace(/"/g, '""')}"` // Escape quotes
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `reports_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
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
            <button 
              onClick={exportToCSV}
              className="flex items-center justify-center sm:justify-start space-x-2 px-3 sm:px-4 py-2 border border-gray-200 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
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
            {reports.slice(0, 15).map((report, index) => (
              <ReportRow 
                key={report._id || report.id || `report-${index}`} 
                report={report} 
                priorityColor={priorityColor}
                statusColor={statusColor}
                onStatusUpdate={onStatusUpdate}
                onReportClick={onReportClick}
              />
            ))}
            {reports.length > 15 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500 bg-gray-50">
                  Showing 15 of {reports.length} reports. <a href="#" className="text-blue-600 hover:text-blue-700">View all reports →</a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}