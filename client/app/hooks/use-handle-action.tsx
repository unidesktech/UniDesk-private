"use client"
import { useState } from "react";
import { ModalProps } from "../models/action.model";

export const useHandleAction = () => {
  // const router = useRouter();
  const [modalProps, setModalProps] = useState<ModalProps | null>(null);

  const handleAction = (
    action: "navigate" | "modal",
    actionValue: any,
    actionUse: "edit" | "add" | "delete",
    data: any
  ) => {
    switch (action) {
      case "navigate":
        // if (actionUse === "edit") router.push(`/${actionValue}?id=${data.id}`);
        // if (actionUse === "add") router.push(`/${actionValue}`);
        break;

      case "modal":
        if (actionUse === "delete") {
          setModalProps({ type: "warning", actionUse, actionValue, data });
        }else if(actionUse === "edit"){
          setModalProps({type: "info", actionUse, actionValue, data})
        }
        break;

      default:
        break;
    }
  };

  const closeModal = () => setModalProps(null);

  return { handleAction, modalProps, closeModal };
};
