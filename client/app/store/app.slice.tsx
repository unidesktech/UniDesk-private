import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../models/types/redux.type";
import { SchoolPreview } from "../models/school.model";

const initialState: AppState = {
  school: null,
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
    setResetPasswordEmail(state, action: PayloadAction<string | null>) {
      state.resetPasswordEmail = action.payload;
    },
    logout() {
      return initialState;
    },
  },
});

export const { setSchool, setResetPasswordEmail, logout } = appSlice.actions;
export default appSlice.reducer;
