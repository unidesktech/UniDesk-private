"use client";

import * as React from "react";
import { Calendar1 } from "lucide-react";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

interface CalendarFieldProps {
  id?: any;
  name: string;
  label?: string;
  value?: Date;
  onChange?: (value: Date | undefined) => void;
  onBlur?: (value: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
}

export const DatePicker: React.FC<CalendarFieldProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  minDate,
  maxDate,
  onBlur,
}) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(value);


  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setOpen(false);
    onChange?.(selectedDate);
  };

  return (
    <div id={id} className="flex flex-col w-full">
      {label && (
        <Label htmlFor={name} className="py-2">
          {label}
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={name}
            className="h-9 min-w-0 w-full px-3 py-1 flex justify-between items-center active:scale-100"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <Calendar1 />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="overflow-hidden p-0"
          side="bottom"
          sideOffset={4}
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={handleSelect}
            onDayBlur={onBlur}
            disabled={
              [
                minDate ? { before: minDate } : null,
                maxDate ? { after: maxDate } : null,
              ].filter(Boolean) as any
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
