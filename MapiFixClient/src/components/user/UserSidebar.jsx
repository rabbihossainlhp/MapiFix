import React, { useState } from "react";
import { 
  User, 
  FileText, 
  BarChart3, 
  LogOut, 
  Menu,
  X,
  Mail,
  Calendar,
  MapPin,
  Plus
} from "lucide-react";

const navigationItems = [
  { icon: BarChart3, label: "Home", id: "dashboard" },
  { icon: Plus, label: "Submit Report", id: "new-report" },
  { icon: FileText, label: "My Reports", id: "reports" },
  { icon: User, label: "Profile", id: "profile" },
];

export default function UserSidebar({ user, activeTab, setActiveTab, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      {/* User Profile Section */}
      <div className="flex-shrink-0 p-4 lg:p-6 xl:p-8">
        <div className="flex items-center space-x-3 mb-6 lg:mb-8">
          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg lg:text-xl font-bold text-white truncate">{user.name}</h2>
            <p className="text-blue-200 text-sm truncate">{user.email}</p>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-6">
          <h3 className="text-white font-semibold mb-3 text-sm lg:text-base">Profile Info</h3>
          <div className="space-y-2">
            <div className="flex items-center text-blue-100 text-xs lg:text-sm">
              <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{user.email}</span>
            </div>
            <div className="flex items-center text-blue-100 text-xs lg:text-sm">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{user.department || "Computer Science"}</span>
            </div>
            <div className="flex items-center text-blue-100 text-xs lg:text-sm">
              <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>Member since Jan 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 lg:px-6 xl:px-8 overflow-y-auto min-h-0">
        <nav className="space-y-2 py-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg xl:rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? "bg-white/20 backdrop-blur-md shadow-lg" 
                  : "hover:bg-white/10"
              }`}
            >
              <item.icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
              <span className="font-medium text-sm lg:text-base">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="flex-shrink-0 p-4 lg:p-6 border-t border-white/20">
        <button 
          onClick={() => {
            onLogout();
            setIsMobileMenuOpen(false);
          }}
          className="w-full flex items-center space-x-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg xl:rounded-xl hover:bg-white/10 transition-colors"
        >
          <LogOut className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
          <span className="font-medium text-sm lg:text-base">Logout</span>
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
          <div className="lg:hidden fixed left-0 top-16 bottom-0 w-4/5 max-w-sm bg-gradient-to-b from-blue-600 to-purple-700 text-white shadow-2xl z-50">
            <SidebarContent />
          </div>
        </>
      )}
    </>
  );
}