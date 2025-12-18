import { CSSProperties } from "react";
import { StyleConfig } from "./resusable.model";
import { HandleAction } from "./action.model";

export interface TableStyleProps {
  tableStyles?: StyleConfig;
  inlineStyles?: CSSProperties;
  className?: string;
}

export interface TableComponentProps {
  headers?: any[];
  data?: any[];
  onRowClick?: (row: any) => void;
  onSelectRow?: (rows: any) => void;
  columnStyles?: any;
  styles?: TableStyleProps;
  className?: string;
  clickableFields?: string[];
  avatar?: boolean;
  checkBox?: boolean;
  rowActionsConfig?: any;
  pagination?: boolean;
  onPaginationChange?: (page: number, limit: number) => void;
  totalValues?: number;
  variant: "table" | "card" | "auto";
  onAction?: HandleAction
  pageSizes?:number[]
}
