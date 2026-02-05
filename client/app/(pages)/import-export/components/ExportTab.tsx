"use client";

import { useState } from "react";
import { Download, FileText, FileSpreadsheet, FilePieChart, Calendar, Filter, ChevronDown } from "lucide-react";

export default function ExportTab() {
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [dateRange, setDateRange] = useState<string>("all");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [includeInactive, setIncludeInactive] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const formatOptions = [
    { id: "csv", name: "CSV Format", description: "Comma-separated values", icon: FileText, color: "text-green-600" },
    { id: "excel", name: "Excel Format", description: "Spreadsheet format", icon: FileSpreadsheet, color: "text-blue-600" },
    { id: "pdf", name: "PDF Report", description: "Printable format", icon: FilePieChart, color: "text-red-600" }
  ];

  const dateOptions = [
    { value: "all", label: "All time" },
    { value: "current_year", label: "Current year" },
    { value: "last_month", label: "Last month" },
    { value: "custom", label: "Custom range" }
  ];

  const classOptions = ["All", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  const handleExport = () => {
    if (!selectedFormat) {
      alert("Please select an export format");
      return;
    }

    // Simulate export process
    const exportData = {
      format: selectedFormat,
      dateRange,
      class: selectedClass,
      includeInactive,
      timestamp: new Date().toISOString()
    };

    console.log("Exporting with options:", exportData);
    alert(`Export started for ${selectedFormat.toUpperCase()} format!`);
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">Export Student Data</h2>
        <p className="text-gray-600 mt-1">Download student records in various formats</p>
      </div>

      <div className="p-6">
        {/* Export Format Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Export Format</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {formatOptions.map((format) => (
              <div
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedFormat === format.id
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${format.color} bg-white border`}>
                    <format.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{format.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{format.description}</div>
                  </div>
                </div>
                {selectedFormat === format.id && (
                  <div className="mt-3 flex items-center gap-1 text-sm text-blue-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                    <span>Selected</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Export Options</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    Date Range
                  </div>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {dateOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setDateRange(option.value)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                        dateRange === option.value
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Class Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    Class Filter
                  </div>
                </label>
                <div className="relative">
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none hover:border-gray-400 transition-colors"
                  >
                    <option value="">All Classes</option>
                    {classOptions.map((cls) => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
              <span>Advanced Options</span>
            </button>

            {showAdvanced && (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="includeInactive"
                    checked={includeInactive}
                    onChange={(e) => setIncludeInactive(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <label htmlFor="includeInactive" className="text-gray-700">
                    Include inactive students
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="includeSensitive"
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <label htmlFor="includeSensitive" className="text-gray-700">
                    Include sensitive information
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="includeMetadata"
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <label htmlFor="includeMetadata" className="text-gray-700">
                    Include system metadata
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Export Preview */}
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-blue-800">Export Preview</h4>
              <p className="text-sm text-blue-600 mt-1">
                Estimated file size: ~2.5 MB • Contains approximately 150 records
              </p>
            </div>
            <div className="text-right">
              <div className="font-medium text-blue-800">Columns included:</div>
              <div className="text-sm text-blue-600">ID, Name, Email, Class, Section, Phone</div>
            </div>
          </div>
        </div>

        {/* Export Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-gray-50 border rounded-lg">
            <div className="text-2xl font-bold text-gray-800">150</div>
            <div className="text-sm text-gray-500">Total Records</div>
          </div>
          <div className="p-4 bg-gray-50 border rounded-lg">
            <div className="text-2xl font-bold text-gray-800">12</div>
            <div className="text-sm text-gray-500">Active Classes</div>
          </div>
          <div className="p-4 bg-gray-50 border rounded-lg">
            <div className="text-2xl font-bold text-gray-800">2.5 MB</div>
            <div className="text-sm text-gray-500">Estimated Size</div>
          </div>
        </div>

        {/* Security Note */}
        <div className="flex items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg mb-8">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-sm text-gray-600">Your export data is encrypted and secure</span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={!selectedFormat}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              selectedFormat
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Download className="w-5 h-5" />
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
}