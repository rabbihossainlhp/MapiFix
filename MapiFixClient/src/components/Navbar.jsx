import React from "react";
import { Wrench, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar({ 
  isAuthenticated = false, 
  user = null, 
  onLogin, 
  onSignup, 
  onLogout, 
  onHome 
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={onHome}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MapiFix
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {!isAuthenticated ? (
              // Guest Navigation
              <>
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Features
                </a>
                <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
                  About
                </a>
                <button 
                  onClick={onLogin}
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                >
                  Sign In
                </button>
                <button 
                  onClick={onSignup}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-md transition-all duration-200"
                >
                  Get Started
                </button>
              </>
            ) : (
              // Authenticated Navigation
              <>
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">{user?.name}</span>
                  {user?.role === 'admin' && (
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <button 
                  onClick={onLogout}
                  className="text-gray-600 hover:text-red-600 transition-colors font-medium"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button - Only show for non-authenticated users */}
          {!isAuthenticated && (
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-all"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {!isAuthenticated ? (
                // Guest Mobile Navigation
                <>
                  <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-1">
                    Features
                  </a>
                  <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-1">
                    About
                  </a>
                  <button 
                    onClick={() => {
                      onLogin();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left text-gray-600 hover:text-blue-600 transition-colors font-medium px-2 py-1"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => {
                      onSignup();
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-md transition-all duration-200 text-center"
                  >
                    Get Started
                  </button>
                </>
              ) : (
                // Authenticated Mobile Navigation
                <>
                  <div className="px-2 py-1">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-gray-800">{user?.name}</span>
                    </div>
                    {user?.role === 'admin' && (
                      <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left text-gray-600 hover:text-red-600 transition-colors font-medium px-2 py-1"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}