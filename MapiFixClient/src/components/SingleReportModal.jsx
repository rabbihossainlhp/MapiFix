// Single Report Modal/Page Component
import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  User, 
  AlertCircle, 
  Clock, 
  CheckCircle2,
  Camera,
  MessageSquare,
  Flag,
  Edit,
  Download
} from 'lucide-react';

const statusConfig = {
  "open": { color: "bg-red-100 text-red-800 border-red-200", icon: AlertCircle, bgColor: "bg-red-50" },
  "in progress": { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock, bgColor: "bg-yellow-50" },
  "in-progress": { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock, bgColor: "bg-yellow-50" },
  "resolved": { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle2, bgColor: "bg-green-50" }
};

const priorityConfig = {
  "low": { color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
  "medium": { color: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
  "high": { color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" }
};

export default function SingleReportModal({ report, isOpen, onClose, isAdmin = false, onStatusUpdate }) {
  const [loading, setLoading] = useState(false);

  console.log('SingleReportModal props:', { isOpen, hasReport: !!report, isAdmin });
  
  if (!isOpen || !report) {
    console.log('SingleReportModal early return:', { isOpen, hasReport: !!report });
    return null;
  }

  console.log('SingleReportModal rendering with report:', report.title);

  const StatusIcon = statusConfig[report.status]?.icon || AlertCircle;
  const statusStyle = statusConfig[report.status] || statusConfig["open"];
  const priorityStyle = priorityConfig[report.priority] || priorityConfig["medium"];

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString || 'N/A';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className={`${statusStyle.bgColor} px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              <StatusIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{report.title}</h2>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Report ID: #{report._id?.slice(-8) || 'N/A'}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-80px)] sm:max-h-[calc(90vh-80px)]">
          <div className="p-4 sm:p-6">
            {/* Status and Priority Row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border ${statusStyle.color}`}>
                <StatusIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                {report.status.replace("-", " ").toUpperCase()}
              </div>
              <div className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border ${priorityStyle.color} ${priorityStyle.bgColor} ${priorityStyle.borderColor}`}>
                <Flag className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                {report.priority.toUpperCase()} PRIORITY
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Left Column - Main Details */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Description */}
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center">
                    <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-600" />
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {report.description || 'No description provided'}
                  </p>
                </div>

                {/* Location */}
                <div className="bg-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                    Location
                  </h3>
                  <p className="text-gray-700 text-base sm:text-lg">{report.location || 'Location not specified'}</p>
                </div>

                {/* Image */}
                {report.image && report.image !== 'example.jpg' && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Camera className="w-5 h-5 mr-2 text-gray-600" />
                      Attached Image
                    </h3>
                    <div className="relative">
                      <img
                        src={report.image}
                        alt="Report attachment"
                        className="w-full max-w-md rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => window.open(report.image, '_blank')}
                      />
                      <div className="absolute top-2 right-2">
                        <button
                          onClick={() => window.open(report.image, '_blank')}
                          className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
                        >
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-4 sm:space-y-6">
                {/* Reporter Info */}
                <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-600" />
                    Reporter
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {(report.reporter?.username || report.reporter?.name || 'U').substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {report.reporter?.username || report.reporter?.name || 'Anonymous'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {report.reporter?.email || 'No email provided'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-gray-600" />
                    Timeline
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Report Created</p>
                        <p className="text-xs text-gray-600">
                          {formatDate(report.createdAt)}
                        </p>
                      </div>
                    </div>
                    {report.updatedAt && report.updatedAt !== report.createdAt && (
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Last Updated</p>
                          <p className="text-xs text-gray-600">
                            {formatDate(report.updatedAt)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Admin Actions */}
                {isAdmin && onStatusUpdate && (
                  <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Admin Actions</h3>
                    <div className="space-y-2">
                      {report.status !== 'in progress' && report.status !== 'in-progress' && (
                        <button
                          onClick={async () => {
                            if (loading) return;
                            setLoading(true);
                            try {
                              await onStatusUpdate(report._id, 'in progress');
                            } catch (error) {
                              console.error('Error updating status:', error);
                            } finally {
                              setLoading(false);
                            }
                          }}
                          disabled={loading}
                          className="w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{loading ? 'Updating...' : 'Mark In Progress'}</span>
                        </button>
                      )}
                      {report.status !== 'resolved' && (
                        <button
                          onClick={async () => {
                            if (loading) return;
                            setLoading(true);
                            try {
                              await onStatusUpdate(report._id, 'resolved');
                            } catch (error) {
                              console.error('Error updating status:', error);
                            } finally {
                              setLoading(false);
                            }
                          }}
                          disabled={loading}
                          className="w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{loading ? 'Updating...' : 'Mark Resolved'}</span>
                        </button>
                      )}
                      {report.status !== 'open' && (
                        <button
                          onClick={async () => {
                            if (loading) return;
                            setLoading(true);
                            try {
                              await onStatusUpdate(report._id, 'open');
                            } catch (error) {
                              console.error('Error updating status:', error);
                            } finally {
                              setLoading(false);
                            }
                          }}
                          disabled={loading}
                          className="w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{loading ? 'Updating...' : 'Mark Open'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
              Report created {formatDate(report.createdAt)}
            </p>
            <div className="flex space-x-2 sm:space-x-3">
              {isAdmin && (
                <button className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Edit Report</span>
                  <span className="sm:hidden">Edit</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}