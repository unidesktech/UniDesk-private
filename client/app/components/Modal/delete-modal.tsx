"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Loader2Icon, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteEntity } from "@/app/services/modal.service";
import { showToast } from "@/app/utils/toast";
import { formatLabel } from "@/app/utils/HelperFunction";

interface DeleteModalProps {
  open: boolean;
  data: Record<string, any> | null;
  onClose: () => void;
  entityType: string;
  onDeleted?: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  data,
  onClose,
  entityType,
  onDeleted,
}) => {
  const [loading, setLoading] = useState(false);

  if (!open || !data) return null;
  const onConfirm = async () => {
    setLoading(true);
    try {
      const res = await deleteEntity({ entityType, id: data.id });
      if (res?.success) {
        showToast(
          `${formatLabel(data.name || "Record")} deleted successfully`,
          "success"
        );
        onDeleted?.();
        onClose();
      } else {
        showToast(
          res?.message || `${formatLabel(data.name || "Record")} delete failed`,
          "error"
        );
      }
    } catch (err) {
      console.error("Delete failed:", err);
      showToast(`${formatLabel(data.name || "Record")} delete failed`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="w-5 h-5" />
            Delete Confirmation
          </DialogTitle>
          <DialogDescription>
            This action is irreversible. The selected record will be permanently
            deleted.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg bg-red-50 border border-red-100 p-3 text-sm text-red-700">
          Are you sure you want to delete{" "}
          <span className="font-semibold">
            {data.name || data.id || "this record"}
          </span>
          ?
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>

          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading && <Loader2Icon className="animate-spin w-4 h-4" />}
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
