import { useEffect, useMemo, useRef, useState } from "react";
import { getDistinctValues } from "../services/common.service";

export function useDropdownOptions(
  config: {
    key: string;
    isDistinct?: boolean;
    tableName?: string;
    columnName?: string;
    dependancy?: string[];
    options?: { id: string; value: string }[];
  },
  activeFilters: Record<string, any>
) {
  const [options, setOptions] = useState<{ id: string; value: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchedOnceRef = useRef(false);

  const dependencyKey = useMemo(() => {
    if (!config.dependancy?.length) return null;
    return config.dependancy
      .map((dep) => activeFilters[dep] ?? "")
      .join("|");
  }, [config.dependancy, ...config.dependancy?.map((d) => activeFilters[d]) ?? []]);

  const isDisabled = useMemo(() => {
    if (!config.dependancy?.length) return false;
    return config.dependancy.some((dep) => !activeFilters[dep]);
  }, [config.dependancy, ...config.dependancy?.map((d) => activeFilters[d]) ?? []]);

  useEffect(() => {
    if (!config.isDistinct) {
      setOptions(config.options ?? []);
      return;
    }

    if (!config.dependancy?.length) {
      if (fetchedOnceRef.current) return;

      fetchedOnceRef.current = true;
      setLoading(true);

      getDistinctValues({
        tableName: config.tableName!,
        columnName: config.columnName!,
      })
        .then(setOptions)
        .finally(() => setLoading(false));

      return;
    }

    if (isDisabled) {
      setOptions([]);
      return;
    }

    setLoading(true);

    const filters: Record<string, any> = {};
    config.dependancy.forEach((dep) => {
      filters[dep] = activeFilters[dep];
    });

    getDistinctValues({
      tableName: config.tableName!,
      columnName: config.columnName!,
      filters,
    })
      .then(setOptions)
      .finally(() => setLoading(false));
  }, [
    config.isDistinct,
    config.tableName,
    config.columnName,
    dependencyKey,
    isDisabled,
  ]);

  return { options, isDisabled, loading };
}
