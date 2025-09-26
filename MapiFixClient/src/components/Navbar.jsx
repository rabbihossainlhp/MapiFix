import React from "react";
import { Wrench, Menu, X, Sparkles, Zap } from "lucide-react";
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
    <nav className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200/60 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Enhanced Logo */}
          <button 
            onClick={onHome}
            className="group flex items-center space-x-3 hover:scale-105 transition-all duration-300"
          >
            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Wrench className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                MapiFix
              </span>
              <span className="text-xs text-gray-500 font-medium tracking-wide">Smart Solutions</span>
            </div>
          </button>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthenticated ? (
              // Guest Navigation
              <>
                <a 
                  href="#features" 
                  className="group relative text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 py-2"
                >
                  Features
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </a>
                
                <button 
                  onClick={onLogin}
                  className="group relative text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 py-2 px-4 rounded-xl hover:bg-blue-50"
                >
                  <span className="flex items-center space-x-2">
                    <span>Sign In</span>
                  </span>
                </button>
                
                <button 
                  onClick={onSignup}
                  className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>Get Started</span>
                  </span>
                </button>
              </>
            ) : (
              // Authenticated Navigation
              <>
                <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-2xl border border-blue-200/50">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-gray-800">{user?.name}</span>
                    {user?.role === 'admin' && (
                      <span className="ml-2 px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full font-medium">
                        Admin
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={onLogout}
                  className="text-gray-600 hover:text-red-600 transition-all duration-300 font-medium px-4 py-2 rounded-xl hover:bg-red-50"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>

          {/* Enhanced Mobile Menu Button */}
          {!isAuthenticated && (
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 rounded-2xl text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 border border-gray-200 hover:border-blue-300"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 rotate-90 transition-transform duration-300" />
                ) : (
                  <Menu className="w-6 h-6 hover:scale-110 transition-transform duration-300" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Enhanced Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-blue-200 py-6 bg-gradient-to-br from-blue-50/80 to-purple-50/80 backdrop-blur-sm">
            <div className="flex flex-col space-y-6">
              {!isAuthenticated ? (
                // Guest Mobile Navigation
                <>
                  <a 
                    href="#features" 
                    className="group text-gray-700 hover:text-blue-600 transition-all duration-300 px-4 py-3 rounded-2xl hover:bg-white/70 hover:shadow-md font-medium"
                  >
                    <span className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                      <span>Features</span>
                    </span>
                  </a>
                  
                  <button 
                    onClick={() => {
                      onLogin();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium px-4 py-3 rounded-2xl hover:bg-white/70 hover:shadow-md"
                  >
                    <span className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                      <span>Sign In</span>
                    </span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      onSignup();
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white px-6 py-4 rounded-2xl hover:shadow-xl transition-all duration-300 text-center font-semibold mx-2"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span>Get Started</span>
                    </span>
                  </button>
                </>
              ) : (
                // Authenticated Mobile Navigation
                <>
                  <div className="flex items-center space-x-3 bg-white/70 backdrop-blur-sm px-4 py-3 rounded-2xl border border-blue-200/50 mx-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {user?.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{user?.name}</div>
                      {user?.role === 'admin' && (
                        <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full font-medium">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-gray-600 hover:text-red-600 transition-all duration-300 font-medium px-4 py-3 rounded-2xl hover:bg-red-50 mx-2"
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