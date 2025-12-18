export type ActionType = "navigate" | "modal";

export type ActionUse = "view" | "edit" | "add" | "delete";

export type HandleAction<T = any> = (
  action: ActionType,
  actionValue?: string,
  actionUse?: ActionUse,
  row?: T
) => void;

export interface ModalProps {
  type: "warning" | "info" | "success";
  actionUse: ActionUse;
  actionValue: any;
  data: any;
}
