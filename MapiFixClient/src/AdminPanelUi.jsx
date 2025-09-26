import React, { useState, useEffect } from "react";
import { getAllReports, getAllUsers, getSingleReport, updateReportStatus } from "./services/apiService";
import Navbar from "./components/Navbar";
import Sidebar from "./components/admin/Sidebar";
import Header from "./components/admin/Header";
import StatsCards from "./components/admin/StatsCards";
import ReportsTable from "./components/admin/ReportsTable";
import DashboardPage from "./components/admin/DashboardPage";
import UsersPage from "./components/admin/UsersPage";
import AllReportsPage from "./components/admin/AllReportsPage";
import SettingsPage from "./components/admin/SettingsPage";
import SingleReportModal from "./components/SingleReportModal";

export default function AdminPanelUI({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Real data from backend
  const [allReports, setAllReports] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Single report modal state
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Fetch both reports and users in parallel
      const [reportsResponse, usersResponse] = await Promise.all([
        getAllReports(),
        getAllUsers()
      ]);
      
      console.log('Admin data loaded - Reports:', reportsResponse.reports?.length, 'Users:', usersResponse.users?.length);
      
      setAllReports(reportsResponse.reports || []);
      setAllUsers(usersResponse.users || []);
      setError("");
    } catch (error) {
      console.error('Admin data fetch error:', error.message);
      setError(`Failed to load admin data: ${error.message}`);
      setAllReports([]);
      setAllUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle report click to open modal
  const handleReportClick = async (reportId) => {
    try {
      setShowReportModal(true);
      
      console.log('Admin clicking on report with ID:', reportId);
      const response = await getSingleReport(reportId);
      console.log('Single report response structure:', response);
      console.log('Available keys in response:', Object.keys(response || {}));
      
      // Handle different possible response structures
      let reportData = null;
      if (response?.report) {
        reportData = response.report;
      } else if (response?.data?.report) {
        reportData = response.data.report;
      } else if (response && typeof response === 'object' && response._id) {
        // Direct report object
        reportData = response;
      }
      
      if (!reportData) {
        throw new Error('Report data not found in response');
      }
      
      console.log('Admin setting report data:', reportData);
      setSelectedReport(reportData);
    } catch (error) {
      console.error('Error fetching single report:', error);
      alert(`Failed to load report details: ${error.message}`);
      setShowReportModal(false);
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowReportModal(false);
    setSelectedReport(null);
  };

  // Handle status update from modal
  const handleStatusUpdate = async (reportId, status) => {
    try {
      console.log('Updating report status:', reportId, 'to', status);
      await updateReportStatus(reportId, status);
      
      // Update the selected report state to reflect the change
      if (selectedReport && selectedReport._id === reportId) {
        setSelectedReport({ ...selectedReport, status });
      }
      
      // Refresh all reports after status update
      fetchAllData();
      
      alert(`Report status updated to "${status}" successfully!`);
    } catch (error) {
      console.error('Error updating report status:', error);
      alert(`Failed to update report status: ${error.message}`);
    }
  };

  const filteredReports = allReports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    open: allReports.filter(r => r.status === "open").length,
    inProgress: allReports.filter(r => r.status === "in progress" || r.status === "in-progress").length,
    resolved: allReports.filter(r => r.status === "resolved").length,
    total: allReports.length,
    totalUsers: allUsers.length
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin data...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <p className="text-red-700 mb-4">{error}</p>
          <button 
            onClick={fetchAllData}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry Loading Data
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case "dashboard":
        return <DashboardPage 
          user={user} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          stats={stats} 
          filteredReports={filteredReports}
          allReports={allReports}
          loading={loading}
          onRefresh={fetchAllData}
          onReportClick={handleReportClick}
        />;
      case "users":
        return <UsersPage 
          users={allUsers}
          loading={loading}
          onRefresh={fetchAllData}
        />;
      case "reports":
        return <AllReportsPage 
          reports={allReports}
          loading={loading}
          onRefresh={fetchAllData}
          onReportClick={handleReportClick}
        />;
      case "settings":
        return <SettingsPage />;
      default:
        return (
          <div>
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <StatsCards stats={stats} />
            <ReportsTable reports={filteredReports} onStatusUpdate={fetchAllData} onReportClick={handleReportClick} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar 
        isAuthenticated={true}
        user={user}
        onLogout={onLogout}
        onHome={() => {}} // Admin shouldn't go back to public homepage when logged in
      />
      
      <div className="flex min-h-screen pt-16">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
        
        <div className="flex-1 p-3 sm:p-4 lg:p-6 xl:p-8 lg:ml-64 xl:ml-80">
          {renderContent()}
        </div>
      </div>

      {/* Single Report Modal */}
      <SingleReportModal
        report={selectedReport}
        isOpen={showReportModal}
        onClose={handleCloseModal}
        isAdmin={true}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}