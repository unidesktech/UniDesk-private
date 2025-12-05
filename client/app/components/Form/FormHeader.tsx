"use client";
import { BreadcrumbComponent } from "../Breadcrumb/BreadcrumbComponent";
import { Button } from "../ui/button";
import { Save, X } from "lucide-react";
import { Switch } from "../ui/switch";

interface FormHeaderProps {
  title: string;
  subtitle: string;
  onSave: () => void | undefined;
  onCancel: () => void | undefined;
  onToggleAutoSave: () => void | undefined;
  autoSave: boolean;
}

export function FormHeader({
  title,
  subtitle,
  onSave,
  onCancel,
  onToggleAutoSave,
  autoSave,
}: FormHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 text-sm mb-3 md:mb-4">
        <BreadcrumbComponent />
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-4 md:mb-0 text-left">
          <h1 className="text-gray-900 mb-1 md:mb-2 text-sm md:text-base">
            {title}
          </h1>
          <p className="text-gray-600 text-xs md:text-base">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch
              checked={autoSave}
              onCheckedChange={onToggleAutoSave}
              className={
                autoSave
                  ? "bg-green-500 data-[state=checked]:bg-green-500"
                  : "bg-gray-300 data-[state=unchecked]:bg-gray-300"
              }
            />
            <span className="text-gray-700 text-xs md:text-sm">Auto Save</span>
          </div>
          <Button
            variant="outline"
            onClick={onCancel}
            className="text-xs md:text-base"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          {!autoSave && (
            <Button
              onClick={onSave}
              className="bg-primary text-xs md:text-base"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
