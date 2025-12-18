"use client";
import { useEffect, useMemo, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { getFormSchema } from "@/app/utils/zod";
import Dropdown from "../Dropdown/Dropdown";
import { Textarea } from "../ui/textarea";
import { DatePicker } from "../DatePicker/DatePicker";
import UploadBox from "../UploadBox/UploadBox";
import { FormHeader } from "./FormHeader";
import { PreviewSidebar } from "./PreviewSidebar";
import { FormFooter } from "./FormFooter";
import { formConfig } from "@/app/config/form.config";
import useDebounce from "@/app/hooks/use-debounce";
import {
  FieldProps,
  FormProps,
  InfoItem,
  SectionProps,
} from "@/app/models/form.model";
import { FormFieldRenderer } from "./form-field-rendrer";

const Form = ({ type, mode, id }: FormProps) => {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [resetFlag, setResetFlag] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [disabled, setDisabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  const { sections, info, preview } = formConfig[type] || {};

  const title = info?.find((item: InfoItem) => item.type === "title")?.mode?.[
    mode
  ]?.value;
  const subtitle = info?.find((item: InfoItem) => item.type === "desc")?.mode?.[
    mode
  ]?.value;

  const formSchema = useMemo(() => getFormSchema(sections ?? []), [sections]);
  const debouncedFormData = useDebounce(formData, 300);

  useEffect(() => {
    const saved = sessionStorage.getItem(`${type}-formData`);
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, [type]);

  const saveToStorage = (data: unknown) => {
    setSaveStatus("saving");
    sessionStorage.setItem(`${type}-formData`, JSON.stringify(data));
    setTimeout(() => setSaveStatus("saved"), 500);
  };

  useEffect(() => {
    if (autoSave) {
      saveToStorage(debouncedFormData);
    }
  }, [debouncedFormData, autoSave]);

  const handleBlur = (field: FieldProps) => {
    const fieldSchema = formSchema.shape[field.name];
    if (!fieldSchema) return;
    const result = fieldSchema.safeParse(formData[field.name]);
    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        [field.name]: result.error.issues[0]?.message,
      }));
      setDisabled(true);
    } else {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field.name];
        return updated;
      });
      setDisabled(false);
    }
  };

  const handleSubmit = () => {
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0]?.toString();
        if (key) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      setDisabled(true);
    } else {
      setErrors({});
      setDisabled(false);
      console.log("Submit success:", result.data);
      // TODO: API call
      // TODO: remove formData from sessionStorage after sucess
    }
  };

  const handleSave = () => saveToStorage(formData);

  const handleCancel = () => {
    setResetFlag(true);
    setFormData({});
    sessionStorage.removeItem(`${type}-formData`);
    setSaveStatus("idle");
  };

  const handleChange = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="px-3 md:px-8 py-6">
        <FormHeader
          onSave={handleSave}
          onCancel={() => setResetFlag(true)}
          title={title ?? ""}
          subtitle={subtitle ?? ""}
          autoSave={autoSave}
          onToggleAutoSave={() => setAutoSave((p) => !p)}
        />
      </div>
      {/* main section */}
      <div className="mt-2 mb-30 px-3 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* form */}
        <div className="lg:col-span-2 space-y-6">
          <FormFieldRenderer
            sections={sections || []}
            formData={formData}
            errors={errors}
            resetFlag={resetFlag}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </div>
        <div className="lg:col-span-1">
          <PreviewSidebar
            formData={debouncedFormData}
            entityType={type}
            config={preview}
          />
        </div>
      </div>

      <FormFooter
        onSave={handleSubmit}
        onCancel={handleCancel}
        mode={mode}
        autoSave={autoSave}
        saveStatus={saveStatus}
        disabled={disabled}
        lastUpdate={
          mode === "edit" ? "November 18, 2025 at 2:30 PM" : undefined
        }
      />
    </div>
  );
};

export default Form;
