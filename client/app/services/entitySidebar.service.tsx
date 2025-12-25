import { getDistinctValues } from "@/app/services/common.service";

interface FetchTabDataParams {
  tabConfig: any;
  item: Record<string, any>;
}

export async function fetchEntityTabData({
  tabConfig,
  item,
}: FetchTabDataParams) {
  if (!tabConfig?.fetchFromApi) return null;

  const filters = {
    ...(tabConfig.api || {}),
    ...(tabConfig.itemKey && item[tabConfig.itemKey]
      ? { [tabConfig.itemKey]: item[tabConfig.itemKey] }
      : {}),
  };

  const payload = {
    tableName: tabConfig.tableName,
    columnName: tabConfig.columnName,
    filters,
  };

  return getDistinctValues(payload);
}
