import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User, typeStatus } from "@/app/auth/domain/auth.domain";

const enum STATUS {
  "ONCHECKING" = "checking",
  "ONLOGIN" = "authenticated",
  "ONLOGOUT" = "not-authenticated",
}

interface IauthState {
  status: typeStatus;
  user: User;
  errorMessage: string | null;
}

const initialState: IauthState = {
  status: "checking",
  user: {} as User,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = STATUS.ONCHECKING;
      state.user = {} as User;
      state.errorMessage = null;
    },
    onLogin: (state, action: PayloadAction<User>) => {      
      state.status = STATUS.ONLOGIN;
      state.user = action.payload;
      state.errorMessage = null;
    },
    onLogout: (state, action: PayloadAction<string | null>) => {
      state.status = STATUS.ONLOGOUT;
      state.user = {} as User;
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
});
// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions;
