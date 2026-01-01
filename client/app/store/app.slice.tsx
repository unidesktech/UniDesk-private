import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../models/types/redux.type";
import { SchoolPreview } from "../models/school.model";
import { UserBasicInfo } from "../models/user.model";

const initialState: AppState = {
  school: null,
  user: null,
  permission: null,
  resetPasswordEmail: null,
  isAuthenticated: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSchool(state, action: PayloadAction<SchoolPreview | null>) {
      state.school = action.payload;
    },
    setUser(state, action: PayloadAction<UserBasicInfo | null>) {
      state.user = action.payload;
    },
    setPermission(state, action: PayloadAction<Record<string, boolean> | null>) {
      state.permission = action.payload;
    },
    setResetPasswordEmail(state, action: PayloadAction<string | null>) {
      state.resetPasswordEmail = action.payload;
    },
    logout() {
      return initialState;
    },
  },
});

export const { setSchool, setUser, setPermission, setResetPasswordEmail, logout } = appSlice.actions;
export default appSlice.reducer;
