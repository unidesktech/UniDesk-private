"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logOut } from "../services/auth.service";
import { ModalProps } from "../models/action.model";

export const useHandleAction = () => {
  const router = useRouter();
    const [modalProps, setModalProps] = useState<ModalProps | null>(null);

  const handleAction = async (
    action: "navigate" | "modal" | "api",
    actionValue: string,
    data: any,
    actionUse?: "edit" | "add" | "delete"
  ) => {
    switch (action) {
      case "navigate":
        if (actionUse) {
          // if (actionUse === "edit") router.push(`/${actionValue}?id=${data.id}`);
          // if (actionUse === "add") router.push(`/${actionValue}`);
        } else {
          router.push(actionValue);
        }
        break;

      case "api":
        if (actionValue === "logout") {
          await logOut();
        }

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

  return { handleAction,
     modalProps,
      closeModal
     };
};
