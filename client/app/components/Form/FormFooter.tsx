import { Button } from "../ui/button";
import { Save, X, Check, Loader2 } from "lucide-react";

interface FormFooterProps {
  onSave: () => void;
  onCancel: () => void;
  mode: "add" | "edit";
  autoSave: boolean;
  disabled: boolean;
  saveStatus: "idle" | "saving" | "saved" | "error";
  lastUpdate?: string;
}

export function FormFooter({
  onSave,
  onCancel,
  mode,
  autoSave,
  saveStatus,
  lastUpdate,
  disabled,
}: FormFooterProps) {
  const getStatusDisplay = () => {
    switch (saveStatus) {
      case "saving":
        return (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Saving...</span>
          </div>
        );
      case "saved":
        return (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Check className="h-4 w-4" />
            <span>Last Update: {lastUpdate}</span>
          </div>
        );
      case "error":
        return (
          <div className="text-sm text-red-600">
            Error saving. Please try again.
          </div>
        );
      default:
        return (
          <span className="text-xs md:text-sm text-gray-600">
            {mode === "add" ? "Creating new record" : "Editing record"}
          </span>
        );
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20">
      <div className="px-8 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          {getStatusDisplay()}

          {autoSave && (
            <>
              <div className="h-4 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-gray-600">Auto-save enabled</span>
              </div>
            </>
          )}
        </div>

        {!lastUpdate && (
          <span className="text-xs md:text-sm text-gray-600">
            {mode === "add" ? "Creating new record" : "Editing record"}
          </span>
        )}

        <div className="flex items-center gap-3 pt-2 md:pt-0">
          <Button
            variant="outline"
            onClick={onCancel}
            className="text-xs md:text-base"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={onSave}
            disabled={disabled}
            className="bg-primary text-xs md:text-base"
          >
            <Save className="h-4 w-4 mr-2" />
            {mode === "add" ? "Create" : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
