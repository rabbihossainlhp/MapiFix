import React, { useState, useEffect, useCallback } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Bell, 
  User, 
  LogOut,
  Camera,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle2,
  Settings,
  X,
  Loader
} from "lucide-react";
import { createReport, getUserReports, getAllReports } from "../services/apiService";
import Navbar from "../components/Navbar";
import UserSidebar from "../components/user/UserSidebar";

const statusConfig = {
  "open": { color: "bg-red-100 text-red-800 border-red-200", icon: AlertCircle },
  "in progress": { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
  "in-progress": { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock }, // Keep both for backward compatibility
  "resolved": { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle2 }
};

export default function UserDashboard({ user, onLogout }) {
  // Debug: Check user token
  console.log('UserDashboard - Current user:', user);
  
  // Decode JWT token to see what's inside
  const token = localStorage.getItem('authToken');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('🔍 JWT Token Payload:', payload);
      console.log('🔍 Token userId:', payload.userId);
      console.log('🔍 User object _id:', user?._id);
      console.log('🔍 IDs match:', payload.userId === user?._id);
    } catch (e) {
      console.error('Token decode error:', e);
    }
  }
  
  const [activeTab, setActiveTab] = useState("dashboard");
  const [newReport, setNewReport] = useState({
    title: "",
    description: "",
    location: "",
    priority: "medium",
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Real reports from backend
  const [userReports, setUserReports] = useState([]);
  const [allReports, setAllReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [allReportsLoading, setAllReportsLoading] = useState(false);

  // Define fetchUserReports function first
  const fetchUserReports = useCallback(async () => {
    setReportsLoading(true);
    console.log('Fetching user reports...');
    console.log('Token before API call:', localStorage.getItem('authToken'));
    
    // Debug: Check what we're sending to backend
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('📤 Sending to backend - UserId in token:', payload.userId);
        console.log('📤 Sending to backend - Role in token:', payload.role);
      } catch (e) {
        console.error('Token decode error:', e);
      }
    }
    
    try {
      const response = await getUserReports();
      console.log('getUserReports response:', response);
      setUserReports(response.reports || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      console.error('Error details:', error.message);
      console.error('Error response:', error.response?.data);
      
      // If authentication failed, the user might not exist in database
      if (error.message.includes('Authentication failed') || error.message.includes('User not found')) {
        const token = localStorage.getItem('authToken');
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.error('🚨 AUTHENTICATION DEBUG:');
            console.error('Frontend user object ID:', user?._id);
            console.error('JWT token userId:', payload.userId);
            console.error('JWT token role:', payload.role);
            console.error('IDs match:', payload.userId === user?._id);
            console.error('');
            console.error('🔧 BACKEND CHECK NEEDED:');
            console.error('1. Check if user exists in MongoDB with ID:', payload.userId);
            console.error('2. Check if authMiddleware is looking in correct collection (User vs Admin)');
            console.error('3. Check if User.findById() is working with this ID format');
          } catch (e) {
            console.error('Token decode error:', e);
          }
        }
        
        // Show detailed error instead of auto-logout
        alert(`Authentication failed: User not found in database. Check console for details.`);
        setUserReports([]); // Clear reports but don't logout
        return;
      }
      
      // Keep empty array if fetch fails
      setUserReports([]);
    } finally {
      setReportsLoading(false);
    }
  }, [user]);

  // Function to fetch all reports (from all users)
  const fetchAllReports = useCallback(async () => {
    setAllReportsLoading(true);
    try {
      console.log('Fetching all reports for user to see others...');
      const response = await getAllReports();
      
      if (response.reports) {
        // Filter out current user's reports to show only others' reports
        const othersReports = response.reports.filter(report => 
          report.reporter?._id !== user?._id && report.reporter?.username !== user?.username
        );
        
        console.log('All reports fetched:', response.reports.length);
        console.log('Others reports (excluding current user):', othersReports.length);
        setAllReports(othersReports);
      }
    } catch (err) {
      console.error('Failed to fetch all reports:', err);
      setAllReports([]);
    } finally {
      setAllReportsLoading(false);
    }
  }, [user]);

  // Fetch user reports and all reports on component mount
  useEffect(() => {
    fetchUserReports();
    fetchAllReports();
  }, [fetchUserReports, fetchAllReports]);

  // Simple token check - run only once on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token && !user) {
      console.log('No token or user found, redirecting to login...');
      onLogout();
    }
  }, [user, onLogout]);

  const filteredReports = userReports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Creating report...');
    console.log('Token before report creation:', localStorage.getItem('authToken'));
    console.log('Current user:', user);
    
    if(!newReport.title || !newReport.description || !newReport.location) {
      setError('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Create FormData for file upload - matching your backend exactly
      const formData = new FormData();
      formData.append('title', newReport.title);
      formData.append('description', newReport.description);
      formData.append('location', newReport.location);
      formData.append('priority', newReport.priority);
      formData.append('status', 'open');
      formData.append('reporter', 'user'); // Required by backend validation
      
      // Add image file with exact field name your backend expects
      if (newReport.image) {
        formData.append('reportImage', newReport.image);
        console.log('Image file details:', {
          name: newReport.image.name,
          size: newReport.image.size,
          type: newReport.image.type
        });
      }
      
      // Debug what we're sending to your backend
      console.log('Sending to backend:', {
        url: 'http://localhost:5000/api/report/create',
        method: 'POST',
        hasImage: !!newReport.image,
        formDataFields: Array.from(formData.keys())
      });
      
      const response = await createReport(formData);
      
      if (response.success) {
        setSuccess('Report submitted successfully!');
        
        // Reset form
        setNewReport({
          title: "",
          description: "",
          location: "",
          priority: "medium",
          image: null
        });
        
        // Clear file input
        const fileInput = document.getElementById('image-upload');
        if (fileInput) {
          fileInput.value = '';
        }
        
        // Refresh reports list
        await fetchUserReports();
        
        // Switch to reports tab after 2 seconds
        setTimeout(() => {
          setActiveTab("reports");
          setSuccess('');
        }, 2000);
      } else {
        setError(response.message || 'Failed to submit report');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while submitting the report');
    } finally {
      setLoading(false);
    }
  };



  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboardContent();
      case "new-report":
        return renderNewReportForm();
      case "reports":
        return renderMyReports();
      case "profile":
        return renderProfile();
      default:
        return renderDashboardContent();
    }
  };

  const renderDashboardContent = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Home</h1>
        <p className="text-gray-600">Welcome back, {user?.name || 'User'}!</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <div className="text-3xl font-bold text-blue-600 mb-2">{userReports.length}</div>
          <div className="text-gray-600">Total Reports</div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <div className="text-3xl font-bold text-yellow-600 mb-2">{userReports.filter(r => r.status === "in progress" || r.status === "in-progress").length}</div>
          <div className="text-gray-600">In Progress</div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <div className="text-3xl font-bold text-green-600 mb-2">{userReports.filter(r => r.status === "resolved").length}</div>
          <div className="text-gray-600">Resolved</div>
        </div>
      </div>

      {/* Recent Reports Section (5 most recent) */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Your Recent Reports</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("reports")}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              View All →
            </button>
            <button
              onClick={() => setActiveTab("new-report")}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Report</span>
            </button>
          </div>
        </div>
        
        {reportsLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-6 h-6 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading reports...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {userReports.slice(0, 5).map((report) => {
              const StatusIcon = statusConfig[report.status]?.icon || AlertCircle;
              return (
                <div key={report._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4 flex-1">
                    <StatusIcon className="w-6 h-6 text-gray-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{report.title}</h3>
                      <p className="text-sm text-gray-600 truncate">
                        {report.location}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Created: {new Date(report.createdAt).toLocaleDateString()} • 
                        Priority: <span className="capitalize">{report.priority}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border whitespace-nowrap ${statusConfig[report.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                      {report.status.replace("-", " ")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {userReports.length === 0 && !reportsLoading && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No reports submitted yet</p>
            <button
              onClick={() => setActiveTab("new-report")}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Your First Report</span>
            </button>
          </div>
        )}
      </div>

      {/* Other People's Recent Reports Section */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Reports from Others</h2>
          <p className="text-sm text-gray-500">See what others have reported recently</p>
        </div>
        
        {allReportsLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-6 h-6 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading community reports...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {allReports.slice(0, 10).map((report) => {
              const StatusIcon = statusConfig[report.status]?.icon || AlertCircle;
              return (
                <div key={report._id} className="flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                  <div className="flex items-center space-x-4 flex-1">
                    <StatusIcon className="w-6 h-6 text-gray-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{report.title}</h3>
                      <p className="text-sm text-gray-600 truncate">
                        {report.location} • By: {report.reporter?.username || 'Anonymous'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Created: {new Date(report.createdAt).toLocaleDateString()} • 
                        Priority: <span className="capitalize">{report.priority}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border whitespace-nowrap ${statusConfig[report.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                      {report.status.replace("-", " ")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {allReports.length === 0 && !allReportsLoading && (
          <div className="text-center py-8">
            <p className="text-gray-500">No other reports available</p>
          </div>
        )}
        
        {allReports.length > 10 && (
          <div className="text-center mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">Showing 10 of {allReports.length} community reports</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderNewReportForm = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Submit New Report</h1>
        <p className="text-gray-600">Report maintenance issues on campus</p>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6">
        {/* Error/Success Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-green-700 text-sm">{success}</span>
          </div>
        )}

        <form id="reportForm" onSubmit={handleFormSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Issue Title</label>
              <input
                type="text"
                value={newReport.title}
                onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                placeholder="Briefly describe the issue"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={newReport.location}
                  onChange={(e) => setNewReport({...newReport, location: e.target.value})}
                  placeholder="Room number or building name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={newReport.priority}
                  onChange={(e) => setNewReport({...newReport, priority: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newReport.description}
                onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                placeholder="Provide detailed description of the issue"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Attach Image (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewReport({...newReport, image: e.target.files[0]})}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  Choose File
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                onClick={() => setActiveTab("dashboard")}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Report</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  const renderMyReports = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">My Reports</h1>
          <p className="text-gray-600">Track all your submitted reports</p>
        </div>
        <button
          onClick={() => setActiveTab("new-report")}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Report</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search your reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-md"
        />
      </div>

      {/* Reports List */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">All Reports ({filteredReports.length})</h2>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        {reportsLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Loading your reports...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReports.map((report) => {
              const StatusIcon = statusConfig[report.status]?.icon || AlertCircle;
              return (
                <div key={report._id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <StatusIcon className="w-6 h-6 text-gray-500" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{report.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{report.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 mt-3 sm:mt-0">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusConfig[report.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                        {report.status === "in-progress" ? "In Progress" : report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </div>
                </div>
                
                {report.description && (
                  <div className="pl-9">
                    <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                  </div>
                )}
                
                {report.image && (
                  <div className="pl-9">
                    <img 
                      src={report.image} 
                      alt="Report attachment" 
                      className="w-32 h-24 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>
            );
          })}
          
          {filteredReports.length === 0 && !reportsLoading && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No reports found</p>
              <button
                onClick={() => setActiveTab("new-report")}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create Your First Report</span>
              </button>
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Profile</h1>
        <p className="text-gray-600">Your account information</p>
      </div>
      
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{user?.name || 'John Doe'}</h2>
            <p className="text-gray-600 text-sm sm:text-base">{user?.email || 'john.doe@university.edu'}</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mt-2 text-xs sm:text-sm text-gray-500">
              <span>ID: {user?.id || 'STU12345'}</span>
              <span className="hidden sm:inline">•</span>
              <span>{user?.department || 'Computer Science'}</span>
              <span className="hidden sm:inline">•</span>
              <span>Member since Jan 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar 
        isAuthenticated={true}
        user={user}
        onLogout={onLogout}
        onHome={() => {}} // User shouldn't go back to public homepage when logged in
      />
      
      <div className="flex min-h-screen pt-16">
        <UserSidebar 
          user={user} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          userReports={userReports}
          onLogout={onLogout}
        />
        
        <div className="flex-1 lg:ml-64 xl:ml-80 p-3 sm:p-4 lg:p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}