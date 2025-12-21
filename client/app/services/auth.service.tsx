import axios from "axios"

export const login = async(data: Record<string,string>) => {

    const res = await axios.post(`${process.env.NEXT_PUBLIC_APIENDPOINT}/auth/login`, data, { withCredentials: true });

    return res.data;
}

export const sendResetLink = async(email: string, schoolCode: string) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_APIENDPOINT}/auth/otp/request`, { email, schoolCode });
    console.log(res.data)
    return res.data;
}

export const verifyOtp = async(email: string, schoolCode: string, otp: string) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_APIENDPOINT}/auth/otp/verify`, { email, schoolCode, otp });
    return res.data;
}

export const resetPassword = async(token: string, password: string) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_APIENDPOINT}/auth/reset-password`, { token, password });
    return res.data;
}