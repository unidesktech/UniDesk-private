import axios from "axios";

export const saveDemo = async (formData: Record<string, string>) => {
  try {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/request-demo/save`,
      formData
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};