import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/admin/Sidebar";
import Header from "./components/admin/Header";
import StatsCards from "./components/admin/StatsCards";
import ReportsTable from "./components/admin/ReportsTable";
import DashboardPage from "./components/admin/DashboardPage";
import UsersPage from "./components/admin/UsersPage";
import AllReportsPage from "./components/admin/AllReportsPage";
import SettingsPage from "./components/admin/SettingsPage";

// Dummy data
const dummyReports = [
  { id: 1, title: "Light not working", location: "CSE 302", status: "open", date: "2024-01-15" },
  { id: 2, title: "AC broken", location: "EEE 101", status: "in-progress", date: "2024-01-14" },
  { id: 3, title: "Leaking tap", location: "Civil Lab", status: "resolved", date: "2024-01-13" },
];

export default function AdminPanelUI({ user, onLogout }) {
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

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardPage 
          user={user} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          stats={stats} 
          filteredReports={filteredReports} 
        />;
      case "users":
        return <UsersPage />;
      case "reports":
        return <AllReportsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return (
          <div>
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <StatsCards stats={stats} />
            <ReportsTable reports={filteredReports} />
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
    </div>
  );
}