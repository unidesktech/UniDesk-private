import api from "../hooks/axios.interceptor";

export const getSidebar = async() => {
    const response = await api.get(`/me/sidebar`);
    return response.data;
}