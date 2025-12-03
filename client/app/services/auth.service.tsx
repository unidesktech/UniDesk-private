import axios from "axios"

export const login = async(data: Record<string,string>) => {

    const res = await axios.post(`${process.env.NEXT_PUBLIC_APIENDPOINT}/auth/login`, data);

    return res.data;
}