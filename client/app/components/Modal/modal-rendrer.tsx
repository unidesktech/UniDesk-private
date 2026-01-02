"use client";
import React from "react";
import { ModalProps } from "@/app/models/action.model";
import { EditModal } from "./edit-modal";
import DeleteModal from "./delete-modal";

interface ModalRendererProps {
  open: boolean;
  modalProps: ModalProps | null;
  onClose: () => void;
  onSuccess?: () => void;
  entityType: string;
}

const ModalRenderer: React.FC<ModalRendererProps> = ({
  open,
  modalProps,
  onClose,
  onSuccess,
  entityType,
}) => {
  if (!open || !modalProps) return null;

  if (modalProps.actionUse === "edit") {
    return (
      <EditModal
        props={modalProps}
        onClose={onClose}
        open={open}
        entityType={entityType}
        onSucess={onSuccess}
      />
    );
  }

  if (modalProps.actionUse === "delete") {
    return (
      <DeleteModal
        open={open}
        data={modalProps.data}
        onClose={onClose}
        entityType={entityType}
        onDeleted={onSuccess}
      />
    );
  }

  return null;
};

export default ModalRenderer;
