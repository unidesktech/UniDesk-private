"use client";

import { FileCheck, X, AlertCircle, CheckCircle } from "lucide-react";
import { StudentImportFile } from "../../../models/student-import.model";

interface UploadedFileCardProps {
  file: StudentImportFile;
  onReset: () => void;
  detectedColumns: number;
  totalRecords: number;
}

export default function UploadedFileCard({
  file,
  onReset,
  detectedColumns,
  totalRecords
}: UploadedFileCardProps) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <FileCheck className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{file.name}</h3>
            <p className="text-sm text-gray-500">{file.size} • Ready for mapping</p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Detected columns: {detectedColumns} columns found in your file</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-3 bg-white border rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Headers Detected</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {file.headers.slice(0, 8).map((header, index) => (
                <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                  {header}
                </span>
              ))}
              {file.headers.length > 8 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  +{file.headers.length - 8} more
                </span>
              )}
            </div>
          </div>
          
          <div className="p-3 bg-white border rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Records Found</span>
            </div>
            <div className="mt-2">
              <span className="text-lg font-semibold text-gray-800">{totalRecords}</span>
              <span className="text-sm text-gray-500 ml-2">student records</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}