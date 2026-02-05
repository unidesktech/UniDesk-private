"use client";

import { ChevronRight, AlertCircle } from "lucide-react";
import { SYSTEM_FIELDS } from "../../../config/student-import.config";
import { FieldMapping } from "../../../models/student-import.model";

interface FieldMappingSectionProps {
  fieldMappings: FieldMapping[];
  detectedColumns: string[];
  onMappingChange: (systemFieldId: string, fileColumnId: string | null) => void;
  progress: {
    mappedFields: number;
    requiredFields: number;
  };
}

export default function FieldMappingSection({
  fieldMappings,
  detectedColumns,
  onMappingChange,
  progress
}: FieldMappingSectionProps) {

  const getFieldMappingStatus = (fieldId: string) => {
    const mapping = fieldMappings.find(m => m.systemFieldId === fieldId);
    const field = SYSTEM_FIELDS.find(f => f.id === fieldId);
    
    if (!mapping?.fileColumnId && field?.required) {
      return { status: 'error', text: 'Required' };
    }
    if (mapping?.autoMatched) {
      return { status: 'success', text: 'Auto-matched' };
    }
    if (mapping?.fileColumnId) {
      return { status: 'success', text: 'Mapped' };
    }
    return { status: 'idle', text: 'Select column...' };
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Field Mapping</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            {progress.mappedFields} / {progress.requiredFields} required fields mapped
          </span>
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${(progress.mappedFields / progress.requiredFields) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 mb-6">Map your file columns to system fields</p>

      <div className="space-y-4">
        {SYSTEM_FIELDS.map(field => {
          const mapping = fieldMappings.find(m => m.systemFieldId === field.id);
          const status = getFieldMappingStatus(field.id);
          
          return (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">{field.label}</span>
                  {field.required && (
                    <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded">Required</span>
                  )}
                  {mapping?.autoMatched && (
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">Auto-matched</span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{field.description}</p>
              </div>
              
              <div className="relative">
                <select
                  value={mapping?.fileColumnId || ""}
                  onChange={(e) => onMappingChange(field.id, e.target.value || null)}
                  className={`w-full p-3 border rounded-lg bg-white appearance-none ${
                    status.status === 'error' 
                      ? 'border-red-300' 
                      : mapping?.fileColumnId 
                        ? 'border-green-300' 
                        : 'border-gray-300'
                  }`}
                >
                  <option value="">Select column...</option>
                  {detectedColumns.map((col, index) => (
                    <option key={index} value={col}>{col}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-3">
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className={`text-xs mt-1 ${
                  status.status === 'error' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {status.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Required Fields Warning */}
      {progress.mappedFields < progress.requiredFields && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center gap-2 text-amber-700">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">
              {progress.requiredFields - progress.mappedFields} required field(s) still need mapping
            </span>
          </div>
        </div>
      )}
    </div>
  );
}