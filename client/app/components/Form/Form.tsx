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
import useDebounce from "@/app/hooks/useDebounce";
import { FieldProps, FormProps, InfoItem, SectionProps } from "@/app/models/form.model";

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

  const title = info?.find((item: InfoItem) => item.type === "title")?.mode?.[mode]
    ?.value;
  const subtitle = info?.find((item: InfoItem) => item.type === "desc")?.mode?.[mode]
    ?.value;

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
          {(sections ?? []).map((section: SectionProps, idx: number) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-gray-900 mb-6">{section.title}</h2>
              <div className="space-y-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {section?.fields?.map((field, idx) => {
                  switch (field.type?.toLowerCase()) {
                    case "text":
                    case "email":
                    case "number":
                      return (
                        <div
                          key={idx}
                          className={`flex flex-col w-full space-y-2 ${
                            idx === (section.fields?.length ?? 0) - 1 &&
                            idx % 2 === 0
                              ? "sm:col-span-2"
                              : ""
                          }`}
                        >
                          <Label htmlFor={field.name}>
                            {field?.label} {field.required && "*"}
                          </Label>
                          <Input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            // value={getInputValue(name, type)}
                            value={formData[field.name] as string}
                            pattern={field?.pattern}
                            onBlur={() => handleBlur(field)}
                            onChange={(e) =>
                              handleChange(field.name, e.target.value)
                            }
                            className={`${
                              errors[field.name] &&
                              "border-red-500 focus:ring-red-500 focus:border-red-500"
                            }`}
                          />
                          {errors[field.name] && (
                            <span className="text-red-500 text-xs -mt-1">
                              {errors[field.name]}
                            </span>
                          )}
                        </div>
                      );
                    case "dropdown":
                      return (
                        <div
                          key={idx}
                          className={`flex w-full flex-col space-y-2 ${
                            idx === (section.fields?.length ?? 0) - 1 &&
                            idx % 2 === 0
                              ? "sm:col-span-2"
                              : ""
                          }`}
                        >
                          <Label htmlFor={field.name}>
                            {field?.label} {field.required && "*"}
                          </Label>
                          <Dropdown
                            id={field.name}
                            value={formData[field.name] as string ?? ""}
                            options={field.options || []}
                            placeholder={field?.placeholder ?? ""}
                            resetFlag={resetFlag}
                            onChange={(value) =>
                              handleChange(field.name, value)
                            }
                            onBlur={() => handleBlur(field)}
                            className={`${
                              errors[field.name] &&
                              "border-red-500 focus:ring-red-500 focus:border-red-500"
                            }`}
                          />
                          {errors[field.name] && (
                            <span className="text-red-500 text-xs -mt-1">
                              {errors[field.name]}
                            </span>
                          )}
                        </div>
                      );
                    case "textarea":
                      return (
                        <div
                          key={idx}
                          className="col-span-1 sm:col-span-2 space-y-2 "
                        >
                          <Label htmlFor={field.name}>
                            {field?.label} {field.required && "*"}
                          </Label>
                          <Textarea
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name] as string ?? ""}
                            onChange={(e) =>
                              handleChange(field.name, e.target.value)
                            }
                            onBlur={() => handleBlur(field)}
                            rows={5}
                          />
                        </div>
                      );
                    case "date":
                      return (
                        <div
                          key={idx}
                          className={`flex w-full flex-col space-y-2 ${
                            idx === (section.fields?.length ?? 0) - 1 &&
                            idx % 2 === 0
                              ? "sm:col-span-2"
                              : ""
                          }`}
                        >
                          <Label htmlFor={field.name}>
                            {field?.label} {field.required && "*"}
                          </Label>
                          <DatePicker
                            id={field.name}
                            name={field.name}
                            value={formData[field.name] as Date}
                            onBlur={() => handleBlur(field)}
                            onChange={(value) =>
                              handleChange(field.name, value)
                            }
                            minDate={
                              field.min ? new Date(field.min) : undefined
                            }
                            maxDate={
                              field.max ? new Date(field.max) : undefined
                            }
                          />
                        </div>
                      );
                    case "uploadbox":
                      return (
                        <div
                          key={idx}
                          className="col-span-1 sm:col-span-2 space-y-2 "
                        >
                          <Label htmlFor={field.name}>
                            {field?.label} {field.required && "*"}
                          </Label>
                          <UploadBox
                            key={idx}
                            value={formData[field.name] as File[]}
                            onFilesChange={(e) => handleChange(field.name, e)}
                            onBlur={() => handleBlur(field)}
                          />
                        </div>
                      );

                    default:
                      return null;
                  }
                })}
              </div>
            </div>
          ))}
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
