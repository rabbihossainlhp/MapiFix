import React, { useState } from "react";
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
  X
} from "lucide-react";
import Navbar from "../components/Navbar";
import UserSidebar from "../components/user/UserSidebar";

// Dummy user reports data
const userReports = [
  { id: 1, title: "Broken projector in MBA 205", location: "MBA 205", status: "in-progress", date: "2024-01-16", priority: "high", description: "The projector is not turning on", image: null },
  { id: 2, title: "Leaking tap in washroom", location: "Library Block", status: "resolved", date: "2024-01-14", priority: "medium", description: "Water leaking from the tap", image: null },
  { id: 3, title: "WiFi not working", location: "CSE 302", status: "open", date: "2024-01-15", priority: "low", description: "No internet connectivity in the classroom", image: null },
];

const statusConfig = {
  "open": { color: "bg-red-100 text-red-800 border-red-200", icon: AlertCircle },
  "in-progress": { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
  "resolved": { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle2 }
};

export default function UserDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [newReport, setNewReport] = useState({
    title: "",
    description: "",
    location: "",
    priority: "medium",
    image: null
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = userReports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name || 'User'}!</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <div className="text-3xl font-bold text-blue-600 mb-2">{userReports.length}</div>
          <div className="text-gray-600">Total Reports</div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <div className="text-3xl font-bold text-yellow-600 mb-2">{userReports.filter(r => r.status === "in-progress").length}</div>
          <div className="text-gray-600">In Progress</div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <div className="text-3xl font-bold text-green-600 mb-2">{userReports.filter(r => r.status === "resolved").length}</div>
          <div className="text-gray-600">Resolved</div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Recent Reports</h2>
          <button
            onClick={() => setActiveTab("reports")}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            View All →
          </button>
        </div>
        <div className="space-y-4">
          {userReports.slice(0, 3).map((report) => {
            const StatusIcon = statusConfig[report.status].icon;
            return (
              <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <StatusIcon className="w-6 h-6 text-gray-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">{report.title}</h3>
                    <p className="text-sm text-gray-600">{report.location} • {report.date}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusConfig[report.status].color}`}>
                  {report.status.replace("-", " ")}
                </span>
              </div>
            );
          })}
        </div>
        {userReports.length === 0 && (
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
    </div>
  );

  const renderNewReportForm = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Submit New Report</h1>
        <p className="text-gray-600">Report maintenance issues on campus</p>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6">
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log("Submitting report:", newReport);
          setActiveTab("reports");
          setNewReport({
            title: "",
            description: "",
            location: "",
            priority: "medium",
            image: null
          });
        }}>
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
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                Submit Report
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

        <div className="space-y-4">
          {filteredReports.map((report) => {
            const StatusIcon = statusConfig[report.status].icon;
            return (
              <div key={report.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
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
                          <span>{report.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 mt-3 sm:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusConfig[report.status].color}`}>
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
        </div>
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