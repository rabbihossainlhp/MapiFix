import React, { useState } from "react";
import { 
  BarChart3, 
  FileText, 
  LogOut, 
  Settings, 
  Users,
  Menu,
  X
} from "lucide-react";

const navigationItems = [
  { icon: BarChart3, label: "Dashboard", id: "dashboard" },
  { icon: FileText, label: "All Reports", id: "reports" },
  { icon: Users, label: "Users", id: "users" },
  { icon: Settings, label: "Settings", id: "settings" },
];

export default function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 p-4 lg:p-6 xl:p-8">
        <div className="flex items-center space-x-3 mb-6 xl:mb-8">
          <div className="w-10 h-10 xl:w-12 xl:h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5 xl:w-6 xl:h-6" />
          </div>
          <div>
            <h1 className="text-lg lg:text-xl xl:text-2xl font-bold">MapiFix Admin</h1>
            <p className="text-blue-200 text-xs xl:text-sm">Administrator Panel</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 lg:px-6 xl:px-8 overflow-y-auto min-h-0">
        <nav className="space-y-2 py-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-3 xl:px-4 py-2.5 xl:py-3 rounded-lg xl:rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? "bg-white/20 backdrop-blur-md shadow-lg" 
                  : "hover:bg-white/10"
              }`}
            >
              <item.icon className="w-4 h-4 xl:w-5 xl:h-5" />
              <span className="font-medium text-sm xl:text-base">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-shrink-0 p-4 lg:p-6 xl:p-6 border-t border-white/20">
        <button 
          onClick={() => {
            onLogout();
            setIsMobileMenuOpen(false);
          }}
          className="w-full flex items-center space-x-3 px-3 xl:px-4 py-2.5 xl:py-3 rounded-lg xl:rounded-xl hover:bg-white/10 transition-colors"
        >
          <LogOut className="w-4 h-4 xl:w-5 xl:h-5" />
          <span className="font-medium text-sm xl:text-base">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 xl:w-80 bg-gradient-to-b from-blue-600 to-purple-700 text-white shadow-2xl fixed left-0 top-16 bottom-0">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed left-0 top-16 bottom-0 w-4/5 sm:w-2/3 max-w-sm bg-gradient-to-b from-blue-600 to-purple-700 text-white shadow-2xl z-50">
            <SidebarContent />
          </div>
        </>
      )}
    </>
  );
}