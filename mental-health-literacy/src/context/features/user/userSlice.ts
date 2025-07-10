import { createSlice } from "@reduxjs/toolkit";
import supabase from "src/lib/supabase";

const initialState = {
  authStatus: supabase()
    .auth.getUser()
    .then((user) => user.data.user?.aud),
};
export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    updateAuthStatus: (state) => {
      state.authStatus = supabase()
        .auth.getUser()
        .then((user) => {
          return user.data.user?.aud;
        });
    },
    signinWithPassword: (state, action) => {
      const { email, password } = action.payload;
      supabase().auth.signInWithPassword({
        email,
        password,
      });
      statusSlice.caseReducers.updateAuthStatus(state);
    },
    signout: (state) => {
      supabase().auth.signOut();
      statusSlice.caseReducers.updateAuthStatus(state);
    },
  },
});

export const { updateAuthStatus, signinWithPassword, signout } =
  statusSlice.actions;
export default statusSlice.reducer;
