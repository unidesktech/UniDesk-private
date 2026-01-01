"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Search, Shield, Plus, ChevronDown, Upload, UserCheck, 
  MoreVertical, Users, CheckSquare, Square, Expand, 
  ChevronsUpDown, Save, X 
} from "lucide-react";
import { rolesPermissionsConfig } from "../../config/roles-permissions.config";
import { RoleItem, PermissionLevel } from "../../models/roles-permissions.model";
import CreateRoleModal from "./components/CreateRoleModel";
import AssignUsersSidebar from "./components/AssignUserSidbar";
import { getLevelText, getLevelColor } from "../../utils/roles-persmission.utils";

export default function RolesPermissionsPage() {
  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState(rolesPermissionsConfig.selectedRole);
  const [expandedSections, setExpandedSections] = useState(["dashboard"]);
  const [permissionStates, setPermissionStates] = useState<Record<string, boolean>>({});
  const [permissionLevels, setPermissionLevels] = useState<Record<string, PermissionLevel>>({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAssignUsersOpen, setIsAssignUsersOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Refs
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Initialize from config
  useEffect(() => {
    const states: Record<string, boolean> = {};
    const levels: Record<string, PermissionLevel> = {};

    rolesPermissionsConfig.permissionSections.forEach(section => {
      section.permissions.forEach(p => {
        states[p.id] = p.enabled;
        levels[p.id] = p.level;
      });
    });

    setPermissionStates(states);
    setPermissionLevels(levels);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!openDropdown) return;
      
      const dropdown = dropdownRefs.current[openDropdown];
      const button = buttonRefs.current[openDropdown];
      
      if (dropdown && !dropdown.contains(e.target as Node) && 
          button && !button.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openDropdown]);

  // Handlers
  const handleCreateRole = async (roleData: any) => {
    const newRole: RoleItem = {
      id: `custom-${Date.now()}`,
      title: roleData.title,
      description: roleData.description,
      usersCount: 0,
      type: "custom",
      scope: "Custom",
      icon: Users
    };

    alert(`Role "${roleData.title}" created successfully!`);
    setSearchQuery("");
    setSelectedRole(newRole);
  };

  const handleBulkAction = (action: "selectAll" | "deselectAll" | "reset") => {
    const newStates: Record<string, boolean> = {};
    const newLevels: Record<string, PermissionLevel> = {};

    rolesPermissionsConfig.permissionSections.forEach(section => {
      section.permissions.forEach(p => {
        switch(action) {
          case "selectAll":
            newStates[p.id] = true;
            newLevels[p.id] = "full";
            break;
          case "deselectAll":
            newStates[p.id] = false;
            newLevels[p.id] = "none";
            break;
          case "reset":
            newStates[p.id] = p.enabled;
            newLevels[p.id] = p.level;
            break;
        }
      });
    });

    setPermissionStates(newStates);
    setPermissionLevels(newLevels);
    setHasUnsavedChanges(action !== "reset");
    if (action === "reset") setExpandedSections(["dashboard"]);
  };

  const handleSaveChanges = () => {
    alert("Changes saved successfully!");
    setHasUnsavedChanges(false);
  };

  const toggleSection = (id: string) => {
    setExpandedSections(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleTogglePermission = (id: string) => {
    const newState = !permissionStates[id];
    
    setPermissionStates(prev => ({ ...prev, [id]: newState }));
    setPermissionLevels(prev => ({ 
      ...prev, 
      [id]: !newState ? "none" : prev[id] === "none" ? "view" : prev[id]
    }));
    setHasUnsavedChanges(true);
  };

  const changePermissionLevel = (id: string, level: PermissionLevel) => {
    setPermissionLevels(prev => ({ ...prev, [id]: level }));
    setPermissionStates(prev => ({ ...prev, [id]: level !== "none" }));
    setOpenDropdown(null);
    setHasUnsavedChanges(true);
  };

  // Helper functions
  const calculateSectionEnabledCount = (sectionId: string) => {
    const section = rolesPermissionsConfig.permissionSections.find(s => s.id === sectionId);
    return section ? section.permissions.filter(p => permissionStates[p.id]).length : 0;
  };

  const filteredRoles = rolesPermissionsConfig.roles.filter(role =>
    role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Header buttons configuration
  const headerButtons = [
    { 
      text: "Assign Users", 
      icon: Upload, 
      onClick: () => setIsAssignUsersOpen(true),
      variant: "outline" 
    },
    { 
      text: "Create New Role", 
      icon: Plus, 
      onClick: () => setIsCreateModalOpen(true),
      variant: "primary" 
    }
  ];

  // Bulk action buttons configuration
  const bulkActions = [
    { text: "Select All", icon: CheckSquare, action: () => handleBulkAction("selectAll") },
    { text: "Deselect All", icon: Square, action: () => handleBulkAction("deselectAll") },
    { text: "Expand All", icon: Expand, action: () => setExpandedSections(
      rolesPermissionsConfig.permissionSections.map(s => s.id)
    ) },
    { text: "Collapse All", icon: ChevronsUpDown, action: () => setExpandedSections([]) },
    { text: "Reset to Default", action: () => handleBulkAction("reset") }
  ];

  // Permission level options
  const levelOptions: PermissionLevel[] = ["none", "view", "edit", "full"];

  // Save changes card buttons
  const saveCardButtons = [
    { 
      text: "Cancel", 
      icon: X, 
      onClick: () => handleBulkAction("reset"),
      variant: "outline" 
    },
    { 
      text: "Save Changes", 
      icon: Save, 
      onClick: handleSaveChanges,
      variant: "primary" 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {rolesPermissionsConfig.header.title}
          </h1>
          <p className="text-gray-600 mt-1">
            {rolesPermissionsConfig.header.subtitle}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {headerButtons.map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.onClick}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                btn.variant === "primary" 
                  ? "bg-blue-600 hover:bg-blue-700 text-white font-medium" 
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <btn.icon size={btn.variant === "primary" ? 18 : 16} />
              {btn.text}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Roles List */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={rolesPermissionsConfig.header.searchPlaceholder}
              className="pl-10 w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {filteredRoles.map(role => {
              const RoleIcon = role.icon || Users;
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`p-4 border-b border-gray-100 last:border-b-0 cursor-pointer transition-colors hover:bg-gray-50 `}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <RoleIcon size={16} className="text-gray-500" />
                        <h4 className="font-semibold text-gray-900">{role.title}</h4>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          role.type === "system" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"
                        }`}>
                          {role.scope}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{role.description}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users size={14} className="mr-1" />
                      <span>{role.usersCount} users</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column - Permissions */}
        <div className="lg:col-span-8 space-y-6">
          {/* Selected Role Info */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={20} className="text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">{selectedRole.title}</h2>
                </div>
                <p className="text-gray-600">{selectedRole.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-gray-600">
                  <UserCheck size={18} className="mr-2" />
                  <span className="font-medium">{selectedRole.usersCount} users assigned</span>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex flex-wrap gap-2">
              {bulkActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={action.action}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  {action.icon && <action.icon size={16} />}
                  {action.text}
                </button>
              ))}
            </div>
          </div>

          {/* Permissions Sections */}
          <div className="space-y-4">
            {rolesPermissionsConfig.permissionSections.map(section => {
              const expanded = expandedSections.includes(section.id);
              const enabledCount = calculateSectionEnabledCount(section.id);

              return (
                <div key={section.id} className="bg-white border border-gray-200 rounded-xl overflow-visible relative">
                  <div
                    onClick={() => toggleSection(section.id)}
                    className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">{section.title}</h3>
                      <span className="text-sm text-gray-500">
                        {enabledCount}/{section.permissions.length} enabled
                      </span>
                    </div>
                    <ChevronDown className={`transition-transform ${expanded ? "rotate-180" : ""} text-gray-400`} size={20} />
                  </div>

                  {expanded && (
                    <div className="p-6 space-y-6">
                      {section.permissions.map(perm => {
                        const enabled = permissionStates[perm.id];
                        const level = permissionLevels[perm.id];
                        const Icon = perm.icon;
                        const isDropdownOpen = openDropdown === perm.id;

                        return (
                          <div key={perm.id} className="flex justify-between items-center">
                            <div className="flex gap-3 items-center">
                              <button
                                onClick={() => handleTogglePermission(perm.id)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  enabled ? "bg-blue-600" : "bg-gray-200"
                                }`}
                              >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                  enabled ? "translate-x-6" : "translate-x-1"
                                }`} />
                              </button>
                              <div className="flex gap-2 items-center">
                                {Icon && <Icon size={18} className="text-gray-500" />}
                                <span className="text-gray-900">{perm.label}</span>
                              </div>
                            </div>

                            <div className="relative">
                              <button
                                ref={el => buttonRefs.current[perm.id] = el}
                                onClick={() => setOpenDropdown(isDropdownOpen ? null : perm.id)}
                                className={`px-4 py-2 border rounded-lg flex items-center justify-between gap-2 w-48 ${getLevelColor(level)}`}
                              >
                                <span className="truncate">{getLevelText(level)}</span>
                                <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                              </button>

                              {isDropdownOpen && (
                                <div
                                  ref={el => dropdownRefs.current[perm.id] = el}
                                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50"
                                >
                                  {levelOptions.map(l => (
                                    <button
                                      key={l}
                                      onClick={() => changePermissionLevel(perm.id, l)}
                                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between ${
                                        level === l ? "bg-blue-50 text-blue-600" : "text-gray-700"
                                      }`}
                                    >
                                      <span>{getLevelText(l)}</span>
                                      {level === l && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateRoleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateRole={handleCreateRole}
      />

      <AssignUsersSidebar
        isOpen={isAssignUsersOpen}
        onClose={() => setIsAssignUsersOpen(false)}
        roleName={selectedRole.title}
        assignedUsers={rolesPermissionsConfig.availableUsers.slice(0, 3)}
      />

      {/* Unsaved Changes Card */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[500px]">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <span className="text-gray-700 font-medium">You have unsaved changes</span>
              </div>
              <div className="flex items-center gap-3">
                {saveCardButtons.map((btn, idx) => (
                  <button
                    key={idx}
                    onClick={btn.onClick}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                      btn.variant === "primary" 
                        ? "bg-blue-600 hover:bg-blue-700 text-white" 
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <btn.icon size={16} />
                    {btn.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}