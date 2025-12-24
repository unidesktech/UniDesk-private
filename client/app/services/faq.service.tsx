import axios from "axios";

export const fetchCategories = async () => {
  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_FAQENDPOINT}/faq/category/getAll`
  );

  return data.data.data;
};

export const fetchTopics = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_FAQENDPOINT}/faq/topic/getAll`
  );
  return res.data.data;
};

export const fetchFaqs = async (params?: {
  category_id?: string;
  topic_id?: string;
  search?: string;
}) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_FAQENDPOINT}/faq/articles/get`,
    {
      params: {
        ...(params?.category_id && { category_id: params.category_id }),
        ...(params?.topic_id && { topic_id: params.topic_id }),
        ...(params?.search && { search: params.search }),
      },
    }
  );

  return res.data.data;
};