import api from "../hooks/axios.interceptor";

export async function getDistinctValues(payload: {
  tableName: string;
  columnName: string;
  filters?: Record<string, string | number | string[]>;
}): Promise<{ id: string; value: string }[]> {
  const { data } = await api.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/common/distinct-values`,
    payload
  );
  return data;
}
