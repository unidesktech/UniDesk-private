import axios from "axios";

const API = process.env.NEXT_PUBLIC_APIENDPOINT;

// 🔁 Toggle this when backend is ready
const USE_MOCK = true;

// ⏳ Artificial delay helper
const delay = (ms = 1200) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export interface SavePayload<T = any> {
  entityType: string;
  data: T;
}

export interface DeletePayload {
  entityType: string;
  id: string;
}

/**
 * SAVE (add / edit)
 */
export const saveEntity = async <T = any>({
  entityType,
  data,
}: SavePayload<T>) => {
  if (!entityType) throw new Error("entityType is required");

  if (USE_MOCK) {
    await delay();
    return {
      success: true,
      message: "Saved successfully (mock)",
      data,
    };
  }

  const res = await axios.post(`${API}/${entityType}/save`, data);
  return res.data;
};

export const deleteEntity = async ({
  entityType,
  id,
}: DeletePayload) => {
  if (!entityType || !id)
    throw new Error("entityType and id are required");

  if (USE_MOCK) {
    await delay();
    return {
      success: true,
      message: "Deleted successfully (mock)",
      id,
    };
  }

  const res = await axios.delete(
    `${API}/${entityType}/delete/${id}`
  );
  return res.data;
};
