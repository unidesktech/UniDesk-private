export interface DropdownProps {
  id?: string;
  placeholder?: string;
  options: DropDownOption[];
  value?: any;
  onChange?: (val: string | number | null) => void;
  className?: string;
  onBlur?: () => void;
  resetFlag?: boolean;
  disabled?: boolean;
}

export interface DropDownOption {
  id: string | number;
  value: string;
}
