import { SystemField, ValidationResult, ValidationError } from "../models/student-import.model";
import * as XLSX from 'xlsx';

export const SYSTEM_FIELDS: SystemField[] = [
  {
    id: "studentId",
    label: "Student ID",
    required: true,
    description: "Unique student identifier",
    dataType: "text",
    validation: {
      minLength: 3,
      maxLength: 20,
      pattern: /^[A-Za-z0-9_-]+$/
    }
  },
  {
    id: "fullName",
    label: "Full Name",
    required: true,
    description: "Student's full name",
    dataType: "text",
    validation: {
      minLength: 2,
      maxLength: 100
    }
  },
  {
    id: "email",
    label: "Email Address",
    required: true,
    description: "Valid email address",
    dataType: "email",
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
    required: false,
    description: "Contact number with country code",
    dataType: "phone",
    validation: {
      pattern: /^\+?[1-9]\d{1,14}$/
    }
  },
  {
    id: "rollNumber",
    label: "Roll Number",
    required: true,
    description: "Class roll number",
    dataType: "text",
    validation: {
      minLength: 1,
      maxLength: 10
    }
  },
  {
    id: "class",
    label: "Class",
    required: true,
    description: "Student class/grade",
    dataType: "select",
    validation: {
      pattern: /^(1[0-2]|[1-9])$/
    }
  },
  {
    id: "section",
    label: "Section",
    required: false,
    description: "Class section",
    dataType: "text",
    validation: {
      minLength: 1,
      maxLength: 2,
      pattern: /^[A-Z]$/
    }
  },
  {
    id: "dateOfBirth",
    label: "Date of Birth",
    required: false,
    description: "Format: DD/MM/YYYY",
    dataType: "date"
  }
];

export const SUPPORTED_FORMATS = [
  { name: "CSV", extensions: [".csv"], icon: "📄" },
  { name: "Excel", extensions: [".xlsx", ".xls"], icon: "📊" }
];

export const IMPORT_STEPS = [
  { id: 1, label: "Upload File", description: "Upload your data file" },
  { id: 2, label: "Map Fields", description: "Match columns to system fields" },
  { id: 3, label: "Validate Data", description: "Check for errors and issues" },
  { id: 4, label: "Import", description: "Complete the import process" }
];

export const VALID_FILE_TYPES = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'application/csv'
];

export const SAMPLE_VALIDATION_RESULT: ValidationResult = {
  summary: {
    totalRows: 150,
    validRows: 147,
    errorRows: 3,
    duplicates: 2
  },
  errors: [
    { row: 12, field: "Email Address", value: "invalid.email", error: "Invalid email format", type: "error" },
    { row: 45, field: "Phone Number", value: "123", error: "Phone number must be 10 digits", type: "error" },
    { row: 89, field: "Class", value: "empty", error: "Required field is missing", type: "error" }
  ],
  hasErrors: true,
  hasWarnings: false
};

export const HELP_SECTIONS = [
  {
    title: "Need Help?",
    description: "Quick guide & tips for importing data",
    buttonText: "View Documentation",
    icon: "HelpCircle"
  },
  {
    title: "Sample Template",
    description: "Download a template file with the correct format",
    buttonText: "Download Template",
    icon: "Download"
  },
  {
    title: "Import Steps",
    description: "Follow these steps to import data",
    buttonText: "",
    icon: ""
  },
  {
    title: "Supported Formats",
    description: "File formats you can upload",
    buttonText: "",
    icon: ""
  }
];

export const EXPORT_FORMAT_OPTIONS = [
  { id: "csv", name: "CSV Format", description: "Comma-separated values", icon: "FileText", color: "text-green-600" },
  { id: "excel", name: "Excel Format", description: "Spreadsheet format", icon: "FileSpreadsheet", color: "text-blue-600" },
  { id: "pdf", name: "PDF Report", description: "Printable format", icon: "FilePieChart", color: "text-red-600" }
];

export const DATE_RANGE_OPTIONS = [
  { value: "all", label: "All time" },
  { value: "current_year", label: "Current year" },
  { value: "last_month", label: "Last month" },
  { value: "custom", label: "Custom range" }
];

export const CLASS_OPTIONS = ["All", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

export const ADVANCED_OPTIONS = [
  { id: "includeInactive", label: "Include inactive students" },
  { id: "includeSensitive", label: "Include sensitive information" },
  { id: "includeMetadata", label: "Include system metadata" }
];

// Helper functions
export const parseFile = (file: File): Promise<{ headers: string[], data: any[] }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) {
          reject(new Error("No data found in file"));
          return;
        }

        let parsedData: any[] = [];
        let headers: string[] = [];

        if (file.name.endsWith('.csv')) {
          const text = data as string;
          const lines = text.split('\n').filter(line => line.trim());
          
          if (lines.length > 0) {
            headers = lines[0].split(',').map(h => h.trim());
            parsedData = lines.slice(1).map(line => {
              const values = line.split(',');
              const obj: any = {};
              headers.forEach((header, index) => {
                obj[header] = values[index]?.trim() || '';
              });
              return obj;
            });
          }
        } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
          const workbook = XLSX.read(data, { type: 'binary' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
          
          if (jsonData.length > 0) {
            headers = jsonData[0] as string[];
            parsedData = jsonData.slice(1).map((row: any) => {
              const obj: any = {};
              headers.forEach((header, index) => {
                obj[header] = row[index] || '';
              });
              return obj;
            });
          }
        }

        resolve({ headers, data: parsedData });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    if (file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
  });
};

export const validateFile = (file: File): boolean => {
  const extension = file.name.toLowerCase();
  const isValidExtension = extension.endsWith('.csv') || 
                          extension.endsWith('.xlsx') || 
                          extension.endsWith('.xls');
  
  const isValidType = VALID_FILE_TYPES.includes(file.type) || 
                     file.type === ''; // Some browsers may not set type for CSV
  
  return isValidExtension && (isValidType || file.type === '');
};

export const validateHeaders = (headers: string[]): boolean => {
  return headers.length > 0 && headers.every(header => header && header.trim().length > 0);
};