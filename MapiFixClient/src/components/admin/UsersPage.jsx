import React, { useState } from "react";
import { Search, Filter, Eye, Edit, Trash2, Plus, Mail, Calendar, MapPin } from "lucide-react";

// Dummy users data
const dummyUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", department: "Computer Science", role: "student", reports: 5, joined: "2024-01-15", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", department: "Electrical Engineering", role: "teacher", reports: 12, joined: "2024-01-10", status: "active" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", department: "Civil Engineering", role: "student", reports: 3, joined: "2024-01-20", status: "inactive" },
  { id: 4, name: "Sarah Wilson", email: "sarah@example.com", department: "Business Administration", role: "student", reports: 8, joined: "2024-01-12", status: "active" },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const filteredUsers = dummyUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const stats = {
    total: dummyUsers.length,
    active: dummyUsers.filter(u => u.status === "active").length,
    students: dummyUsers.filter(u => u.role === "student").length,
    teachers: dummyUsers.filter(u => u.role === "teacher").length,
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">Users Management</h1>
        <p className="text-gray-600 text-sm sm:text-base">Manage all registered users in the system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-white/80 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg">
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-1">{stats.total}</div>
          <div className="text-xs sm:text-sm text-gray-600">Total Users</div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg">
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mb-1">{stats.active}</div>
          <div className="text-xs sm:text-sm text-gray-600">Active Users</div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg">
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 mb-1">{stats.students}</div>
          <div className="text-xs sm:text-sm text-gray-600">Students</div>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg">
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600 mb-1">{stats.teachers}</div>
          <div className="text-xs sm:text-sm text-gray-600">Teachers</div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-8 sm:pl-10 pr-4 py-2 rounded-lg sm:rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 text-sm sm:text-base"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="teacher">Teachers</option>
          </select>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg sm:rounded-xl hover:shadow-lg transition-all flex items-center justify-center space-x-2 text-sm sm:text-base">
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">User</th>
                <th className="hidden md:table-cell px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Department</th>
                <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Role</th>
                <th className="hidden sm:table-cell px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Reports</th>
                <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Status</th>
                <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-xs sm:text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-900 text-xs sm:text-sm lg:text-base truncate">{user.name}</div>
                        <div className="text-xs text-gray-500 truncate">{user.email}</div>
                        <div className="md:hidden text-xs text-gray-500 mt-0.5">{user.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 text-xs sm:text-sm text-gray-700">{user.department}</td>
                  <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4">
                    <span className={`inline-flex px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded-full ${
                      user.role === 'teacher' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="hidden sm:table-cell px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 text-xs sm:text-sm text-gray-700">{user.reports}</td>
                  <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4">
                    <span className={`inline-flex px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4">
                    <div className="flex items-center space-x-1">
                      <button className="p-0.5 sm:p-1 hover:bg-gray-100 rounded transition-colors">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      </button>
                      <button className="p-0.5 sm:p-1 hover:bg-gray-100 rounded transition-colors">
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                      </button>
                      <button className="p-0.5 sm:p-1 hover:bg-gray-100 rounded transition-colors">
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}