"use client";
import { Search, LayoutGrid, LayoutList } from "lucide-react";
import Dropdown from "../Dropdown/Dropdown";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDropdownOptions } from "@/app/hooks/use-dropdown-options";
import useDebounce from "@/app/hooks/use-debounce";
import { useEffect, useState } from "react";

type ViewMode = "table" | "card";

interface FilterOption {
  value: string;
  id: string;
}

interface FilterItem {
  key: string;
  label: string;
  options?: FilterOption[];
  isDistinct?: boolean;
  tableName?: string;
  columnName?: string;
  dependancy?: string[];
}

interface FilterBarConfig {
  searchPlaceholder?: string;
  enableViewToggle?: boolean;
  filters: FilterItem[];
}

interface FilterBarProps {
  config: FilterBarConfig;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: Record<string, any>;
  onFiltersChange: (filters: Record<string, any>) => void;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
}

export function FilterBar({
  config,
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  viewMode,
  onViewModeChange,
}: FilterBarProps) {
  const [searchInput, setSearchInput] = useState(searchQuery);
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="bg-white rounded-xl p-4 border shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 lg:w-1/2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={config.searchPlaceholder}
              className="pl-10 bg-gray-50"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 lg:w-1/2">
          {config.filters.map((filter) => {
            const { options, isDisabled } = useDropdownOptions(filter, filters);
            console.log(filters, filter.key)
            return (
              <div key={filter.key} className="flex-1 min-w-[180px]">
                <Dropdown
                placeholder={filter.label}
                  options={options}
                  value={filters[filter.key] ?? null}
                  disabled={isDisabled}
                  onChange={(v) =>
                    onFiltersChange({
                      ...filters,
                      [filter.key]: v,
                    })
                  }
                />
              </div>
            );
          })}

          {config.enableViewToggle && viewMode && onViewModeChange && (
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewModeChange("table")}
                className={viewMode === "table" ? "bg-white shadow-sm" : ""}
              >
                <LayoutList className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewModeChange("card")}
                className={viewMode === "card" ? "bg-white shadow-sm" : ""}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
