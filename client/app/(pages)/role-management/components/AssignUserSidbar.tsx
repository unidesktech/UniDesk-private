// components/roles/AssignUsersSidebar.tsx
"use client";

import { useState } from "react";
import {
  X,
  Search,
  Users,
  Mail,
  BookOpen,
  Check,
  ChevronDown,
  Filter,
} from "lucide-react";
import { User } from "../../../models/roles-permissions.model";
import { rolesPermissionsConfig } from "../../../config/roles-permissions.config";

interface AssignUsersSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  roleName: string;
  assignedUsers: User[];
}

export default function AssignUsersSidebar({
  isOpen,
  onClose,
  roleName,
  assignedUsers: initialAssigned,
}: AssignUsersSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>(
    initialAssigned.map((user) => user.id)
  );
  const [selectedDepartment, setSelectedDepartment] = useState(
    "All Departments"
  );
  const [showDepartmentFilter, setShowDepartmentFilter] = useState(false);

  // Get users and departments from config
  const allUsers = rolesPermissionsConfig.availableUsers;
  const departments = rolesPermissionsConfig.departments;

  // Filter users based on search and department
  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "All Departments" ||
      user.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  const handleToggleUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      // If all are selected, deselect all
      setSelectedUsers([]);
    } else {
      // Otherwise select all filtered users
      setSelectedUsers(filteredUsers.map((user) => user.id));
    }
  };

  const handleSave = () => {
    const selectedUserDetails = allUsers.filter((user) =>
      selectedUsers.includes(user.id)
    );
    console.log("Assigned users:", selectedUserDetails);
    alert(`Assigned ${selectedUsers.length} users to ${roleName} role!`);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-100 flex"
      onClick={handleOverlayClick}
    >
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed height */}
        <div className="shrink-0 p-6 border-b border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Assign Users to {roleName}
              </h2>
              <p className="text-gray-600 mt-1 text-sm">
                Select users to assign to this role.{" "}
                {selectedUsers.length} users currently selected.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <button
              onClick={handleSelectAll}
              className={`px-4 py-2 border rounded-lg text-sm transition-colors whitespace-nowrap ${
                selectedUsers.length === filteredUsers.length && filteredUsers.length > 0
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {selectedUsers.length === filteredUsers.length && filteredUsers.length > 0
                ? "Deselect All"
                : "All Departments"}
            </button>

            {/* Department Filter Dropdown */}
            <div className="relative flex-1">
              <button
                onClick={() => setShowDepartmentFilter(!showDepartmentFilter)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <Filter size={16} />
                  <span className="truncate">{selectedDepartment}</span>
                </div>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform ${showDepartmentFilter ? 'rotate-180' : ''}`}
                />
              </button>

              {showDepartmentFilter && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => {
                        setSelectedDepartment(dept);
                        setShowDepartmentFilter(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                        selectedDepartment === dept
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Users List - Scrollable area */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No users found matching your search.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredUsers.map((user) => {
                const isSelected = selectedUsers.includes(user.id);
                const isInitiallyAssigned = initialAssigned.some(
                  (assigned) => assigned.id === user.id
                );

                return (
                  <div
                    key={user.id}
                    onClick={() => handleToggleUser(user.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                      isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Selection Checkbox */}
                      <div className="shrink-0 mt-1">
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center ${
                            isSelected
                              ? "bg-blue-600 border-blue-600"
                              : "border-gray-300"
                          }`}
                        >
                          {isSelected && <Check size={14} className="text-white" />}
                        </div>
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">
                              {user.name}
                              {isInitiallyAssigned && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                  Assigned
                                </span>
                              )}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Mail size={14} className="text-gray-400 shrink-0" />
                              <p className="text-sm text-gray-600 truncate">{user.email}</p>
                            </div>
                          </div>
                          <Users size={16} className="text-gray-400 shrink-0 ml-2" />
                        </div>

                        {/* Department */}
                        <div className="flex items-center gap-2 mt-3">
                          <BookOpen size={14} className="text-gray-400 shrink-0" />
                          <span className="text-sm text-gray-500 truncate">
                            {user.department}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer - Fixed height */}
        <div className="shrink-0 p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{selectedUsers.length}</span> users selected
            </div>
            <div className="text-sm text-gray-600">
              Showing: {filteredUsers.length} of {allUsers.length} users
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Save Assignments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}