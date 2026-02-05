export interface StudentImportFile {
  id: string;
  name: string;
  size: string;
  uploadedAt: Date;
  status: 'uploaded' | 'mapping' | 'validating' | 'importing' | 'completed' | 'error';
  headers: string[];
  data: any[];
}

export interface SystemField {
  id: string;
  label: string;
  required: boolean;
  description?: string;
  dataType: 'text' | 'number' | 'date' | 'email' | 'phone' | 'select';
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    minValue?: number;
    maxValue?: number;
  };
}

export interface FieldMapping {
  systemFieldId: string;
  fileColumnId: string | null;
  autoMatched: boolean;
  fileHeader: string;
}

export interface ImportProgress {
  currentStep: number;
  totalSteps: number;
  status: 'idle' | 'uploading' | 'mapping' | 'validating' | 'importing' | 'completed';
  mappedFields: number;
  requiredFields: number;
  errors: ImportError[];
  totalRecords: number;
  processedRecords: number;
}

export interface ImportError {
  row: number;
  column: string;
  message: string;
  type: 'warning' | 'error';
}

export interface StudentRecord {
  id?: string;
  studentId: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  rollNumber: string;
  class: string;
  section?: string;
  dateOfBirth?: Date;
}

export interface ValidationSummary {
  totalRows: number;
  validRows: number;
  errorRows: number;
  duplicates: number;
}

export interface ValidationError {
  row: number;
  field: string;
  value: string;
  error: string;
  type: 'error' | 'warning';
}

export interface ValidationResult {
  summary: ValidationSummary;
  errors: ValidationError[];
  hasErrors: boolean;
  hasWarnings: boolean;
}