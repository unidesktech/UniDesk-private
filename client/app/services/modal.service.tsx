import api from "../hooks/axios.interceptor";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;
export interface SavePayload<T = any> {
  entityType: string;
  data: T;
}

export interface DeletePayload {
  entityType: string;
  id: string;
}

export const saveEntity = async <T = any>({
  entityType,
  data,
}: SavePayload<T>) => {
  if (!entityType) throw new Error("entityType is required");
  const res = await api.post(`${API}/${entityType}/save`, data);
  return res.data;
};

export const deleteEntity = async ({
  entityType,
  id,
}: DeletePayload) => {
  if (!entityType || !id)
    throw new Error("entityType and id are required");
  const res = await api.delete(
    `${API}/${entityType}/delete/${id}`
  );
  return res.data;
};
