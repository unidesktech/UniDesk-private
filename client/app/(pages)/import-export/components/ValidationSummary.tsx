"use client";

import { CheckCircle, AlertCircle, Download, Edit } from "lucide-react";
import { ValidationResult } from "../../../models/student-import.model";

interface ValidationSummaryProps {
  validationResult: ValidationResult;
  onEditError: (row: number, field: string) => void;
  onDownloadErrorReport: () => void;
  onCancel: () => void;
  onImport: () => void;
}

export default function ValidationSummary({
  validationResult,
  onEditError,
  onDownloadErrorReport,
  onCancel,
  onImport
}: ValidationSummaryProps) {
  const { summary, errors } = validationResult;

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">Validation Summary</h2>
        <p className="text-gray-600 mt-1">Review the validation results before importing</p>
      </div>

      <div className="p-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center p-4 border rounded-lg">
            <div className="text-3xl font-bold text-gray-800">{summary.totalRows}</div>
            <div className="text-sm text-gray-500 mt-1">Total Rows</div>
          </div>
          <div className="text-center p-4 border border-green-200 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-700">{summary.validRows}</div>
            <div className="text-sm text-green-600 mt-1">Valid Rows</div>
          </div>
          <div className="text-center p-4 border border-red-200 bg-red-50 rounded-lg">
            <div className="text-3xl font-bold text-red-700">{summary.errorRows}</div>
            <div className="text-sm text-red-600 mt-1">Error Rows</div>
          </div>
          <div className="text-center p-4 border border-amber-200 bg-amber-50 rounded-lg">
            <div className="text-3xl font-bold text-amber-700">{summary.duplicates}</div>
            <div className="text-sm text-amber-600 mt-1">Duplicates</div>
          </div>
        </div>

        {/* Summary Messages */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-green-800 font-medium">{summary.validRows} rows are ready to be imported with no issues.</p>
            </div>
          </div>

          {summary.errorRows > 0 && (
            <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-800 font-medium">{summary.errorRows} rows have validation errors and will be skipped.</p>
                <p className="text-red-600 text-sm mt-1">Review errors below or download the error report.</p>
              </div>
            </div>
          )}

          {summary.duplicates > 0 && (
            <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-amber-800 font-medium">{summary.duplicates} duplicate entries detected based on ID or email.</p>
                <p className="text-amber-600 text-sm mt-1">Check your import settings to skip or overwrite duplicates.</p>
              </div>
            </div>
          )}
        </div>

        {/* Error Review Section */}
        {errors.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Error Review</h3>
                <p className="text-gray-600">{errors.length} rows with validation errors</p>
              </div>
              <button
                onClick={onDownloadErrorReport}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Error Report
              </button>
            </div>

            {/* Errors Table */}
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-5 bg-gray-50 border-b">
                <div className="p-3 font-medium text-gray-700">Row</div>
                <div className="p-3 font-medium text-gray-700">Field</div>
                <div className="p-3 font-medium text-gray-700">Value</div>
                <div className="p-3 font-medium text-gray-700">Error</div>
                <div className="p-3 font-medium text-gray-700">Action</div>
              </div>
              
              {errors.map((error, index) => (
                <div key={index} className="grid grid-cols-5 border-b last:border-b-0 hover:bg-gray-50">
                  <div className="p-3 text-gray-600">#{error.row}</div>
                  <div className="p-3 text-gray-700">{error.field}</div>
                  <div className="p-3 text-gray-600 font-mono">{error.value}</div>
                  <div className="p-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${error.type === 'error' ? 'bg-red-500' : 'bg-amber-500'}`} />
                      <span className={`${error.type === 'error' ? 'text-red-600' : 'text-amber-600'}`}>
                        {error.error}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <button
                      onClick={() => onEditError(error.row, error.field)}
                      className="flex items-center gap-2 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Error Message */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                These rows will be automatically skipped during import. Fix the errors in your file and re-upload to import all records.
              </p>
            </div>
          </div>
        )}

        {/* Security Note */}
        <div className="flex items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg mb-8">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-sm text-gray-600">Your data is safe and encrypted</span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <button
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onImport}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Import Now
          </button>
        </div>
      </div>
    </div>
  );
}