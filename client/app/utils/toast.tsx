import { toast } from "sonner";
import React from "react";

type ToastType = "success" | "error" | "warning" | "info" | "loading" |"default";

interface ShowToastOptions {
  duration?: number;
  isLoading?: boolean;
  id?: string | number;
}

export const showToast = (
  message: string | React.ReactNode,
  typeOrOptions?: ToastType | ShowToastOptions,
  maybeOptions?: ShowToastOptions
) => {
  let type: ToastType = "default";
  let options: ShowToastOptions = {};

  if (typeof typeOrOptions === "string") {
    type = typeOrOptions;
    options = maybeOptions || {};
  } else if (typeOrOptions) {
    options = typeOrOptions;
  }

  const { duration = 2500, isLoading = false, id } = options;
  const toastConfig = { duration: isLoading ? Infinity : duration, id };

  if (isLoading) return toast.loading(message, toastConfig);
  if (React.isValidElement(message)) return toast(message, toastConfig);

  switch (type) {
    case "success":
      return toast.success(message, toastConfig);
    case "error":
      return toast.error(message, toastConfig);
    case "warning":
      return toast.warning(message, toastConfig);
    case "info":
      return toast.info(message, toastConfig);
    default:
      return toast(message, toastConfig);
  }
};
