"use client";

import * as React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Upload, X } from "lucide-react";

interface UploadBoxProps {
  label?: string;
  onFilesChange?: (files: File[]) => void;
  value?: File[];
  onBlur?: (value: any | undefined) => void;
}

const UploadBox: React.FC<UploadBoxProps> = ({
  label,
  onFilesChange,
  value,
  onBlur,
}) => {
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);

  React.useEffect(() => {
    if (value) setUploadedFiles(value);
  }, [value]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    const updatedFiles = [...uploadedFiles, ...filesArray];
    setUploadedFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  return (
    <div>
      {label && <Label className="py-2">{label}</Label>}
      <div className="mt-2 flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-2 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">
              PDF, DOC, DOCX, PNG, JPG (MAX. 10MB)
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            multiple
            onBlur={onBlur}
            onChange={handleFileUpload}
          />
        </label>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <Label>Uploaded Files</Label>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-sm text-gray-700">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadBox;
