import axios from "axios";

export async function getDistinctValues(payload: {
  tableName: string;
  columnName: string;
  filters?: Record<string, string | number | string[]>;
}): Promise<{ id: string; value: string }[]> {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_APIENDPOINT}/common/distinct-values`,
    payload
  );
  return data;
}
