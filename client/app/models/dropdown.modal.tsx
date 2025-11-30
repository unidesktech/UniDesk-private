export interface DropdownProps {
  placeholder: string;
  options: DropDownOption[];
  value?: string;
  onChange?: (val: string | number | null) => void;
  className?: string;
  onBlur?: () => void;
  resetFlag?: boolean;
  id?: any;
}

export interface DropDownOption {
  id: any;
  value: string;
}
