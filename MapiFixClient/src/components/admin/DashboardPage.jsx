import React from "react";
import StatsCards from "./StatsCards";
import ReportsTable from "./ReportsTable";
import Header from "./Header";

export default function DashboardPage({ searchTerm, setSearchTerm, stats, filteredReports, onReportClick, onRefresh }) {
  return (
    <div className="space-y-6">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <StatsCards stats={stats} />
      <ReportsTable reports={filteredReports} onStatusUpdate={onRefresh} onReportClick={onReportClick} />
    </div>
  );
}