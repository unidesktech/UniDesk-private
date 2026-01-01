"use client";

import { useState } from "react";
import {
  X,
  Shield,
  Users,
  BookOpen,
  DollarSign,
  Bus,
  GraduationCap,
} from "lucide-react";

interface CreateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRole: (roleData: {
    title: string;
    description: string;
    template: string;
    allowAdvanced: boolean;
  }) => void;
}

const baseTemplates = [
  { id: "scratch", name: "Start from Scratch", icon: Shield },
  { id: "teacher", name: "Teacher", icon: BookOpen },
  { id: "admin", name: "Admin", icon: Users },
  { id: "accountant", name: "Accountant", icon: DollarSign },
  { id: "librarian", name: "Librarian", icon: BookOpen },
  { id: "transport", name: "Transport Manager", icon: Bus },
  { id: "parent", name: "Parent", icon: Users },
  { id: "student", name: "Student", icon: GraduationCap },
];

export default function CreateRoleModal({
  isOpen,
  onClose,
  onCreateRole,
}: CreateRoleModalProps) {
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("scratch");
  const [allowAdvanced, setAllowAdvanced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!roleName.trim()) {
      alert("Please enter a role name");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onCreateRole({
        title: roleName.trim(),
        description: roleDescription.trim(),
        template: selectedTemplate,
        allowAdvanced,
      });
      
      // Reset form
      setRoleName("");
      setRoleDescription("");
      setSelectedTemplate("scratch");
      setAllowAdvanced(false);
      
      onClose();
    } catch (error) {
      console.error("Error creating role:", error);
      alert("Failed to create role. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Create New Role</h2>
            <p className="text-gray-600 mt-1">
              Set up a new role with custom permissions for your school users.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role Name
              </label>
              <input
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="e.g., Department Coordinator"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Role Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role Description
              </label>
              <textarea
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
                placeholder="Brief description of this role's purpose"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Base Permissions Template */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Base Permissions Template
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {baseTemplates.map((template) => {
                  const Icon = template.icon;
                  const isSelected = selectedTemplate === template.id;
                  
                  return (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 border rounded-lg text-center transition-all ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Icon
                          size={20}
                          className={
                            isSelected ? "text-blue-600" : "text-gray-500"
                          }
                        />
                        <span
                          className={`text-sm font-medium ${
                            isSelected ? "text-blue-700" : "text-gray-700"
                          }`}
                        >
                          {template.name}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Advanced Permissions Toggle */}
            <div className="pt-4 border-t border-gray-100">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowAdvanced}
                  onChange={(e) => setAllowAdvanced(e.target.checked)}
                  className="sr-only"
                />
              </label>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !roleName.trim()}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Role"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}