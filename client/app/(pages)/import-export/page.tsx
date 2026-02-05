"use client";

import { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { HelpCircle, Download, CheckCircle } from "lucide-react";
import {
  SYSTEM_FIELDS,
  SUPPORTED_FORMATS,
  IMPORT_STEPS,
  HELP_SECTIONS,
  SAMPLE_VALIDATION_RESULT,
  parseFile,
  validateFile,
  validateHeaders
} from "../../config/student-import.config";
import {
  StudentImportFile,
  FieldMapping,
  ImportProgress,
  ValidationResult
} from "../../models/student-import.model";
import FileUploadArea from "./components/FileUploadArea";
import UploadedFileCard from "./components/UploadedFileCard";
import FieldMappingSection from "./components/FieldMappingSection";
import ValidationSummary from "./components/ValidationSummary";
import ExportTab from "./components/ExportTab";

export default function ImportExportPage() {
  // State
  const [activeTab, setActiveTab] = useState<"import" | "export">("import");
  const [uploadedFile, setUploadedFile] = useState<StudentImportFile | null>(null);
  const [detectedColumns, setDetectedColumns] = useState<string[]>([]);
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([]);
  const [progress, setProgress] = useState<ImportProgress>({
    currentStep: 1,
    totalSteps: 4,
    status: "idle",
    mappedFields: 0,
    requiredFields: SYSTEM_FIELDS.filter((f) => f.required).length,
    errors: [],
    totalRecords: 0,
    processedRecords: 0
  });
  const [showValidation, setShowValidation] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper functions
  const updateProgress = (mappings: FieldMapping[]) => {
    const mappedRequired = mappings.filter((m) => {
      const field = SYSTEM_FIELDS.find((f) => f.id === m.systemFieldId);
      return field?.required && m.fileColumnId;
    }).length;

    setProgress((prev) => ({
      ...prev,
      mappedFields: mappedRequired
    }));
  };

  const handleMappingChange = (systemFieldId: string, fileColumnId: string | null) => {
    const updatedMappings = fieldMappings.map((mapping) =>
      mapping.systemFieldId === systemFieldId
        ? {
            ...mapping,
            fileColumnId,
            autoMatched: false,
            fileHeader: fileColumnId || ""
          }
        : mapping
    );

    setFieldMappings(updatedMappings);
    updateProgress(updatedMappings);
  };

  // Event handlers
  const handleFileUpload = async (file: File) => {
    if (!validateFile(file)) {
      setFileError("Please upload a valid CSV or Excel file");
      toast.error("Invalid file type. Please upload CSV or Excel files only.");
      return;
    }

    try {
      setProgress((prev) => ({ ...prev, status: "uploading" }));
      const loadingToast = toast.loading("Uploading file...");

      const { headers, data } = await parseFile(file);

      if (!validateHeaders(headers)) {
        setFileError("Invalid file format or empty headers");
        toast.dismiss(loadingToast);
        toast.error("Invalid file format. Please check the file headers.");
        return;
      }

      // Auto-match headers with system fields
      const initialMappings = SYSTEM_FIELDS.map((field) => {
        const matchedHeader = headers.find(
          (header) =>
            header.toLowerCase().includes(field.label.toLowerCase()) ||
            field.label.toLowerCase().includes(header.toLowerCase())
        );

        return {
          systemFieldId: field.id,
          fileColumnId: matchedHeader || null,
          autoMatched: !!matchedHeader,
          fileHeader: matchedHeader || ""
        };
      });

      const newFile: StudentImportFile = {
        id: Date.now().toString(),
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        uploadedAt: new Date(),
        status: "uploaded",
        headers,
        data
      };

      setUploadedFile(newFile);
      setDetectedColumns(headers);
      setFieldMappings(initialMappings);

      const mappedRequired = initialMappings.filter((m) => {
        const field = SYSTEM_FIELDS.find((f) => f.id === m.systemFieldId);
        return field?.required && m.fileColumnId;
      }).length;

      setProgress((prev) => ({
        ...prev,
        status: "mapping",
        currentStep: 2,
        mappedFields: mappedRequired,
        totalRecords: data.length,
        processedRecords: 0
      }));

      setFileError("");
      toast.dismiss(loadingToast);
      toast.success(`File uploaded successfully! Found ${data.length} records.`);
      
    } catch (error) {
      console.error("Error parsing file:", error);
      setFileError("Failed to parse file. Please check the format.");
      toast.error("Failed to parse file. Please check the file format.");
    }
  };

  const handleValidate = () => {
    setProgress((prev) => ({ ...prev, status: "validating", currentStep: 3 }));
    const validationToast = toast.loading("Validating data...");

    setTimeout(() => {
      setValidationResult(SAMPLE_VALIDATION_RESULT);
      setShowValidation(true);
      toast.dismiss(validationToast);
      toast.success("Validation completed successfully!");
    }, 1500);
  };

  const handleEditError = (row: number, field: string) => {
    toast(`Editing row #${row}, field: ${field}`);
  };

  const handleDownloadErrorReport = () => {
    toast.loading("Preparing error report...");
    setTimeout(() => toast.success("Error report downloaded!"), 1000);
  };

  const handleImport = () => {
    setShowValidation(false);
    setProgress((prev) => ({ ...prev, status: "importing", currentStep: 4 }));
    
    const importToast = toast.loading(`Importing ${validationResult?.summary.validRows} valid records...`);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const totalRecords = validationResult?.summary.validRows || 0;
        const newProcessed = prev.processedRecords + Math.ceil(totalRecords / 20);
        const isComplete = newProcessed >= totalRecords;

        if (isComplete) {
          clearInterval(interval);
          toast.dismiss(importToast);
          toast.success(`Successfully imported ${totalRecords} student records!`);
          return {
            ...prev,
            status: "completed",
            processedRecords: totalRecords
          };
        }

        return { ...prev, processedRecords: newProcessed };
      });
    }, 200);
  };

  const handleReset = () => {
    setUploadedFile(null);
    setDetectedColumns([]);
    setFieldMappings([]);
    setShowValidation(false);
    setValidationResult(null);
    setProgress({
      currentStep: 1,
      totalSteps: 4,
      status: "idle",
      mappedFields: 0,
      requiredFields: SYSTEM_FIELDS.filter((f) => f.required).length,
      errors: [],
      totalRecords: 0,
      processedRecords: 0
    });
    setFileError("");
    toast.success("Import reset. Ready for new file upload.");
  };

  const handleDownloadTemplate = () => {
  const toastId = toast.loading("Preparing template file...");

  setTimeout(() => {
    toast.success("Template download started!", { id: toastId });

    setTimeout(() => {
      toast.success("Template downloaded successfully!");
    }, 1000);
  }, 800);
};


  const handleViewDocumentation = () => {
    toast("Opening documentation...");
  };

  // Render helper functions
  const renderHelpSection = (section: typeof HELP_SECTIONS[0], index: number) => {
    const commonClasses = "bg-white rounded-xl border shadow-sm p-6";

    switch (index) {
      case 0: // Need Help
        return (
          <div key={index} className={commonClasses}>
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800">{section.title}</h3>
            </div>
            <p className="text-gray-600 text-sm">{section.description}</p>
            <button 
              className="w-full mt-4 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              onClick={handleViewDocumentation}
            >
              {section.buttonText}
            </button>
          </div>
        );

      case 1: // Sample Template
        return (
          <div key={index} className={commonClasses}>
            <h3 className="font-semibold text-gray-800 mb-4">{section.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{section.description}</p>
            <button
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              onClick={handleDownloadTemplate}
            >
              <Download className="w-4 h-4" />
              {section.buttonText}
            </button>
          </div>
        );

      case 2: // Import Steps
        return (
          <div key={index} className={commonClasses}>
            <h3 className="font-semibold text-gray-800 mb-4">{section.title}</h3>
            <div className="space-y-4">
              {IMPORT_STEPS.map((step) => (
                <div key={step.id} className="flex items-start gap-3">
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    progress.currentStep > step.id ? 'bg-green-100 text-green-600' :
                    progress.currentStep === step.id ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {progress.currentStep > step.id ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  <div>
                    <div className={`font-medium ${
                      progress.currentStep >= step.id ? 'text-gray-800' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </div>
                    <div className="text-sm text-gray-500">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3: // Supported Formats
        return (
          <div key={index} className={commonClasses}>
            <h3 className="font-semibold text-gray-800 mb-4">{section.title}</h3>
            <div className="space-y-2">
              {SUPPORTED_FORMATS.map((format) => (
                <div key={format.name} className="flex items-center justify-between py-2">
                  <span className="text-gray-700">{format.name}</span>
                  <span className="text-sm text-gray-500">{format.extensions.join(", ")}</span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderImportContent = () => {
    if (showValidation && validationResult) {
      return (
        <ValidationSummary
          validationResult={validationResult}
          onEditError={handleEditError}
          onDownloadErrorReport={handleDownloadErrorReport}
          onCancel={() => setShowValidation(false)}
          onImport={handleImport}
        />
      );
    }

    if (!uploadedFile) {
      return (
        <FileUploadArea
          onFileUpload={handleFileUpload}
          dragOver={dragOver}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleFileUpload}
          fileInputRef={fileInputRef}
          error={fileError}
        />
      );
    }

    return (
      <>
        <UploadedFileCard
          file={uploadedFile}
          onReset={handleReset}
          detectedColumns={detectedColumns.length}
          totalRecords={progress.totalRecords}
        />

        <div className="bg-white rounded-xl border shadow-sm p-6">
          <FieldMappingSection
            fieldMappings={fieldMappings}
            detectedColumns={detectedColumns}
            onMappingChange={handleMappingChange}
            progress={{
              mappedFields: progress.mappedFields,
              requiredFields: progress.requiredFields
            }}
          />

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
            <button
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleValidate}
              disabled={progress.mappedFields < progress.requiredFields}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                progress.mappedFields >= progress.requiredFields
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Validate Data
            </button>
          </div>
        </div>
      </>
    );
  };

  const renderImportProgress = () => {
    if (progress.status === "importing") {
      return (
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-800">Importing Data...</h3>
            <div className="w-full max-w-md mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Processing records</span>
                <span>
                  {progress.processedRecords} / {validationResult?.summary.validRows || progress.totalRecords}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{
                    width: `${(progress.processedRecords / (validationResult?.summary.validRows || progress.totalRecords)) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (progress.status === "completed") {
      return (
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="p-4 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">Import Successful!</h3>
            <p className="text-gray-500 mt-2 mb-2">
              Successfully imported {validationResult?.summary.validRows || progress.totalRecords} student records
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-4"
            >
              Import Another File
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster position="top-right" toastOptions={{
        duration: 3000,
        style: { background: '#363636', color: '#fff' },
        success: { duration: 3000, style: { background: '#10b981', color: '#fff' } },
        error: { duration: 4000, style: { background: '#ef4444', color: '#fff' } },
        loading: { duration: Infinity, style: { background: '#3b82f6', color: '#fff' } },
      }} />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Import & Export – Students</h1>
          <p className="text-gray-600 mt-2">Bulk upload or download data in one place.</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-8">
          {["import", "export"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "import" | "export")}
              className={`px-6 py-3 font-medium text-lg border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab} Data
            </button>
          ))}
        </div>

        {activeTab === "import" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Upload & Mapping */}
            <div className="lg:col-span-2 space-y-8">
              {renderImportContent()}
              {renderImportProgress()}
            </div>

            {/* Right Column - Help & Info */}
            <div className="space-y-6">
              {HELP_SECTIONS.map((section, index) => renderHelpSection(section, index))}
            </div>
          </div>
        ) : (
          <ExportTab />
        )}
      </div>
    </div>
  );
}