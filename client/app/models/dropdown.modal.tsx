export interface DropdownProps {
  id?: string;
  placeholder: string;
  options: DropDownOption[];
  value?: string;
  onChange?: (val: string | number | null) => void;
  className?: string;
  onBlur?: () => void;
  resetFlag?: boolean;
}

export interface DropDownOption {
  id: string | number;
  value: string;
}
