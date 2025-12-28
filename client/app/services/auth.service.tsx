import axios from "axios";
import api from "../hooks/axios.interceptor";
import { showToast } from "../utils/toast";

export const login = async (data: Record<string, string>) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_APIENDPOINT}/auth/login`,
    data,
    { withCredentials: true }
  );

  return res.data;
};

export const sendResetLink = async (email: string, schoolCode: string) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_APIENDPOINT}/auth/otp/request`,
    { email, schoolCode }
  );
  return res.data;
};

export const verifyOtp = async (
  email: string,
  schoolCode: string,
  otp: string
) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_APIENDPOINT}/auth/otp/verify`,
    { email, schoolCode, otp }
  );
  return res.data;
};

export const resetPassword = async (token: string, password: string) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_APIENDPOINT}/auth/reset-password`,
    { token, password }
  );
  return res.data;
};

export const logOut = async () => {
  showToast("Logging out...", "loading", { id: "log-out", isLoading: true });
  const res = await api.post("/auth/logout");

  if (res.data.success) {
    showToast("Logged out successfully", "success", { id: "log-out" });
  }
  else {
    showToast(res.data.message || "Error logging out.", "error", { id: "log-out" });
  }
};
