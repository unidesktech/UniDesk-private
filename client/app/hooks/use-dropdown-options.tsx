import { useEffect, useState } from "react";
import { DropDownOption } from "../models/dropdown.modal";
import { getDistinctValues } from "../services/common.service";
import { FieldProps } from "../models/form.model";

export const useDropdownOptions = (
  field: FieldProps,
  formData: Record<string, any>,
  page = 1,
  mode = "default"
) => {
  const {
    options: staticOptions,
    isDistinct,
    dependancy,
    type,
    tableName,
    columnName,
  } = field;

  const [options, setOptions] = useState<DropDownOption[]>(staticOptions || []);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (type !== "dropdown") return;

    const fetchOptions = async () => {
      if (dependancy?.length) {
        const hasParentValue = dependancy.every((dep) => formData[dep]);
        if (!hasParentValue && !isDistinct) {
          setOptions([]);
          setIsDisabled(true);
          return;
        }
      }
      if (isDistinct) {
        if (!tableName || !columnName) {
          console.warn("Missing tableName or columnName for distinct dropdown");
          setOptions([]);
          setIsDisabled(true);
          return;
        }

        const filters =
          dependancy?.reduce((acc, dep) => {
            if (formData[dep]) acc[dep] = formData[dep];
            return acc;
          }, {} as Record<string, any>) ?? {};

        const data = await getDistinctValues({
          tableName,
          columnName,
          filters,
        });

        setOptions(data || []);
        setIsDisabled(!data || data.length === 0);
        return;
      }
      if (staticOptions) {
        setOptions(staticOptions);
        setIsDisabled(false);
      }
    };

    fetchOptions();
  }, [formData, JSON.stringify(dependancy)]);

  return { options, isDisabled };
};
