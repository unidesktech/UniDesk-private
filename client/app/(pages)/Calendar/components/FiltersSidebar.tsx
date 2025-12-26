"use client";
import { X, ChevronDown } from "lucide-react";
import { 
  calendarConfig, 
  getEventTypeById, 
  generateEventStyles 
} from "../../../config/calender.config";

interface FiltersSidebarProps {
  filterState: Record<string, any>;
  onFilterChange: (filterId: string, value: any) => void;
  onClose: () => void;
  onSelectAll: () => void;
}

export default function FiltersSidebar({
  filterState,
  onFilterChange,
  onClose,
  onSelectAll,
}: FiltersSidebarProps) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onSelectAll}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Select All
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {calendarConfig.filters.map((filter) => {
          if (filter.id === "event-type") {
            return (
              <div key={filter.id}>
                <h4 className="font-medium text-gray-900 mb-4">
                  {filter.label}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {filter.options.map((option) => {
                    const isSelected = (
                      filterState[filter.id] as string[]
                    ).includes(option.value);
                    const eventType = getEventTypeById(option.value);
                    
                    let styles = { bgColor: "bg-gray-50", textColor: "text-gray-600", borderColor: "border-gray-200" };
                    if (eventType) {
                      styles = generateEventStyles(eventType.color);
                    }

                    return (
                      <button
                        key={option.value}
                        onClick={() => {
                          const currentValues = filterState[
                            filter.id
                          ] as string[];
                          const newValues = isSelected
                            ? currentValues.filter((v) => v !== option.value)
                            : [...currentValues, option.value];
                          onFilterChange(filter.id, newValues);
                        }}
                        className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                          isSelected && eventType
                            ? `${styles.bgColor} ${styles.textColor} border-2 ${styles.borderColor}`
                            : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            option.color || "bg-gray-400"
                          }`}
                        ></span>
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          }

          return (
            <div key={filter.id}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {filter.label}
              </label>
              <div className="relative">
                <select
                  value={filterState[filter.id] as string}
                  onChange={(e) => onFilterChange(filter.id, e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  {filter.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}