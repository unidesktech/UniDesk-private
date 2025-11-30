"use client";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/app/components/ui/dropdown-menu";
import { cn } from "@/app/lib/utils";
import { ChevronDown } from "lucide-react";
import { DropdownProps } from "@/app/models/dropdown.modal";

const Dropdown: React.FC<DropdownProps> = ({
  placeholder,
  options,
  value,
  onChange,
  className,
  onBlur,
  resetFlag,
  id,
}) => {
  const [selected, setSelected] = React.useState<string | number | null>(
    value ?? null
  );

  React.useEffect(() => {
    setSelected(value ?? null);
  }, [value]);

  React.useEffect(() => {
    if (!resetFlag) return;
    if (selected !== null) {
      setSelected(null);
      onChange?.(null);
    }
  }, [resetFlag, onChange, selected]);

  const handleSelect = (val: string | number | null) => {
    if (val === selected) {
      setSelected(null);
      onChange?.(null);
    } else {
      setSelected(val);
      onChange?.(val);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        id={id}
        onBlur={onBlur}
        className={cn(
          "group h-9 px-3 py-1 rounded-md border bg-background text-gray-500 text-[0.9rem]  w-full flex items-center justify-between gap-2",
          className
        )}
      >
        <span
          className={cn(
            "truncate",
            !selected ? "placeholder:text-muted-foreground" : "text-foreground"
          )}
        >
          {selected
            ? options.find((o) => o.id === selected)?.value
            : placeholder}
        </span>

        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-300",
            "group-data-[state=open]:rotate-180"
          )}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={cn(
          "w-(--radix-dropdown-menu-trigger-width)",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2",
          "duration-200"
        )}
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={cn(
              selected === option.id ? "bg-accent text-accent-foreground" : "",
              "cursor-pointer"
            )}
          >
            {option.value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
