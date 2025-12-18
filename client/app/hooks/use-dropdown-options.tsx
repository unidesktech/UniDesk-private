import { useEffect, useState } from "react";
import { FieldProps } from "@/app/models/form.model";
import { fetchDistinctValues } from "../services/utility.service";
import { DropDownOption } from "../models/dropdown.modal";

export const useDropdownOptions = (
  field: FieldProps,
  formData: Record<string, any>,
  page = 1,
  mode = "default"
) => {
  const { options: staticOptions, isDistinct, dependancy, type } = field;
  const [options, setOptions] = useState<DropDownOption[]>(staticOptions || []);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (type !== "dropdown") return;

    const fetchOptions = async () => {
      // Check dependencies
      if (dependancy?.length) {
        const hasParentValue = dependancy.every((dep) => formData[dep]);
        if (!hasParentValue && !isDistinct) {
          setOptions([]);
          setIsDisabled(true);
          return;
        }
      }
      if (isDistinct || (dependancy?.length && dependancy.every((dep) => formData[dep]))) {
        const data = await fetchDistinctValues(field, formData, page, mode);
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
