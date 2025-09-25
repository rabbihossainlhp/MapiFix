import React from "react";
import { Bell, Search } from "lucide-react";

export default function Header({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 sm:mb-8 gap-4 lg:gap-0">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Welcome back! Here's what's happening today.</p>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="relative flex-1 lg:flex-none">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search reports..."
            className="w-full lg:w-auto pl-8 sm:pl-10 pr-4 py-2 sm:Py-2 rounded-lg sm:rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-md text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="p-2 rounded-lg sm:rounded-xl bg-white/80 backdrop-blur-md border border-gray-200 hover:shadow-lg transition-shadow flex-shrink-0">
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}