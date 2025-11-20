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

interface DropdownProps {
  placeholder: string;
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (val: string | null) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  placeholder,
  options,
  value,
  onChange,
  className,
}) => {
  const [selected, setSelected] = React.useState<string | null>(value ?? null);

  const handleSelect = (val: string) => {
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
        className={cn(
          "group px-4 py-2 rounded-md border bg-background text-foreground w-48 flex items-center justify-between gap-2",
          className
        )}
      >
        <span className="truncate">
          {selected
            ? options.find((o) => o.value === selected)?.label
            : placeholder}
        </span>

        {/* Chevron Icon */}
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
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={cn(
              selected === option.value
                ? "bg-accent text-accent-foreground"
                : "",
              "cursor-pointer"
            )}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
