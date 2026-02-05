"use client";

import { Upload, AlertCircle } from "lucide-react";
import { SUPPORTED_FORMATS, validateFile } from "../../../config/student-import.config";

interface FileUploadAreaProps {
  onFileUpload: (file: File) => void;
  dragOver: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  error?: string;
}

export default function FileUploadArea({
  onFileUpload,
  dragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  fileInputRef,
  error
}: FileUploadAreaProps) {
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateFile(file)) {
      alert('Please upload a valid CSV or Excel file');
      return;
    }

    onFileUpload(file);
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
        dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
      }`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="p-4 bg-blue-100 rounded-full">
          <Upload className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            Drag and drop your file here
          </h3>
          <p className="text-gray-500 mt-1">
            or click to browse from your computer
          </p>
        </div>
        
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-700">{error}</span>
          </div>
        )}
        
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Choose File
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileSelect}
        />
        
        <div className="flex items-center gap-4 mt-4">
          {SUPPORTED_FORMATS.map(format => (
            <span key={format.name} className="text-sm text-gray-500">
              {format.icon} {format.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}