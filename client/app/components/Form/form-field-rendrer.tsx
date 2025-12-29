import { FormRendererProps } from "@/app/models/form.model";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DatePicker } from "../DatePicker/DatePicker";
import UploadBox from "../UploadBox/UploadBox";
import Dropdown from "../Dropdown/Dropdown";
import { useDropdownOptions } from "@/app/hooks/use-dropdown-options";
import { Checkbox } from "../ui/checkbox";

export const FormFieldRenderer = ({
  section,
  formData,
  errors,
  resetFlag,
  handleChange,
  handleBlur,
}: FormRendererProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {section?.fields?.map((field, idx) => {
        switch (field.type?.toLowerCase()) {
          case "text":
          case "email":
          case "number":
            return (
              <div
                key={idx}
                className={`flex flex-col w-full space-y-2 ${
                  idx === (section.fields?.length ?? 0) - 1 && idx % 2 === 0
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
                  value={(formData[field.name] as string) ?? ""}
                  pattern={field?.pattern}
                  onBlur={() => handleBlur(field)}
                  onChange={(e) => handleChange(field.name, e.target.value)}
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
            const { options, isDisabled } = useDropdownOptions(field, formData);
            return (
              <div
                key={idx}
                className={`flex w-full flex-col space-y-2 ${
                  idx === (section.fields?.length ?? 0) - 1 && idx % 2 === 0
                    ? "sm:col-span-2"
                    : ""
                }`}
              >
                <Label htmlFor={field.name}>
                  {field?.label} {field.required && "*"}
                </Label>
                <Dropdown
                  id={field.name}
                  value={(formData[field.name] as string) ?? ""}
                  options={options}
                  placeholder={field?.placeholder ?? ""}
                  resetFlag={resetFlag ?? undefined}
                  onChange={(value) => handleChange(field.name, value)}
                  onBlur={() => handleBlur(field)}
                  disabled={isDisabled}
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
              <div key={idx} className="col-span-1 sm:col-span-2 space-y-2 ">
                <Label htmlFor={field.name}>
                  {field?.label} {field.required && "*"}
                </Label>
                <Textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  value={(formData[field.name] as string) ?? ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  onBlur={() => handleBlur(field)}
                  rows={5}
                />
              </div>
            );
          case "checkbox": {
            const selectedValues = Array.isArray(formData[field.name])
              ? (formData[field.name] as string[])
              : [];
            const toggleValue = (value: string) => {
              if (field.singleSelect) {
                if (selectedValues[0] === value) return;
                handleChange(field.name, [value]);
                return;
              }

              handleChange(
                field.name,
                selectedValues.includes(value)
                  ? selectedValues.filter((v) => v !== value)
                  : [...selectedValues, value]
              );
            };

            return (
              <div key={idx} className="col-span-1 sm:col-span-2 space-y-2">
                <Label>
                  {field.label} {field.required && "*"}
                </Label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {field.values?.map((option: string, idx:number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3"
                    >
                      <Checkbox
                        checked={selectedValues.includes(option)}
                        onCheckedChange={() => toggleValue(option)}
                        id={`${field.name}-${option}`}
                      />
                      <Label
                        htmlFor={`${field.name}-${option}`}
                        className="cursor-pointer text-sm text-gray-700"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>

                {errors[field.name] && (
                  <span className="text-red-500 text-xs">
                    {errors[field.name]}
                  </span>
                )}
              </div>
            );
          }
          case "date":
            return (
              <div
                key={idx}
                className={`flex w-full flex-col space-y-2 ${
                  idx === (section.fields?.length ?? 0) - 1 && idx % 2 === 0
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
                  onChange={(value) => handleChange(field.name, value)}
                  minDate={field.min ? new Date(field.min) : undefined}
                  maxDate={field.max ? new Date(field.max) : undefined}
                />
              </div>
            );
          case "uploadbox":
            return (
              <div key={idx} className="col-span-1 sm:col-span-2 space-y-2 ">
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
  );
};