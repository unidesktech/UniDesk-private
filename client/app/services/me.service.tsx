import api from "../hooks/axios.interceptor";

export const getSidebar = async() => {
    const response = await api.get(`/me/sidebar`);
    return response.data;
}

export const getStoreValue = async() => {
    const response = await api.get(`/me/store-values`);
    return response.data;
}