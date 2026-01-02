"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FormFieldRenderer } from "../Form/form-field-rendrer";
import { FieldProps } from "@/app/models/form.model";
import { getFormSchema } from "@/app/utils/zod";
import { formConfig } from "@/app/config/form.config";
import { saveEntity } from "@/app/services/modal.service";
import { Loader2Icon } from "lucide-react";
import { showToast } from "@/app/utils/toast";
import { formatLabel } from "@/app/utils/HelperFunction";

// const NON_EDITABLE_FIELDS = ["id", "_id", "userId"];

interface EditDialogProps {
  open: boolean;
  props: Record<string, any> | null;
  onClose: () => void;
  entityType: string;
  onSucess?: () => void;
}

export function EditModal({
  open,
  props,
  onClose,
  entityType,
  onSucess,
}: EditDialogProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { sections } = formConfig?.[entityType] || {};
  const rowData = props?.data;
  useEffect(() => {
    if (rowData) {
      setFormData(rowData);
      sessionStorage.setItem("edit_row", JSON.stringify(rowData));
    }
  }, [rowData]);

  if (!open || !rowData) return null;

  const onSubmit = async () => {
    try {
      setDisabled(true);
      setLoading(true);
      const res = await saveEntity({
        entityType,
        data: formData,
      });
      if (res?.success) {
        showToast(`${formatLabel(entityType)} updated successfully`, "success");
        onSucess?.()
        onClose();
      }

    } catch (err) {
      console.error("Save failed:", err);
      showToast(`${formatLabel(entityType)} update failed`, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: FieldProps) => {
    if (!sections) return;
    const formSchema = getFormSchema(sections);
    const fieldSchema = formSchema.shape[field.name];
    if (!fieldSchema) return;
    const result = fieldSchema.safeParse(formData[field.name]);
    setErrors((prev) => {
      const updated = { ...prev };
      if (!result.success) {
        updated[field.name] = result.error.issues[0]?.message;
      } else {
        delete updated[field.name];
      }

      return updated;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Edit Record</DialogTitle>
          <DialogDescription>
            Update the fields below. ID fields are locked.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 max-h-[65vh] overflow-auto">
          <div className="lg:col-span-2 space-y-6">
            <FormFieldRenderer
              sections={sections || []}
              formData={formData}
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleChange}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              disabled={loading}
              className={`${loading && "cursor-pointer"}`}
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            disabled={disabled}
            onClick={onSubmit}
            className={`${disabled && "cursor-pointer"}`}
          >
            {loading && <Loader2Icon className="animate-spin w-4 h-4" />}
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
