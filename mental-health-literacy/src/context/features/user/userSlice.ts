import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "src/lib/supabase";

// Initial user state is going to be email fetched from Supabase if they have an active session
const initialState = {
  user: null as string | null,
  user_error: null as string | null,
};

export const update_user = createAsyncThunk("user/update", async () => {
  const response = await supabase().auth.getUser();
  const user = response.data.user?.email;
  return { user };
});

export const user_login = createAsyncThunk(
  "user/login",
  async (credentials: { email: string; password: string }) => {
    const response = await supabase().auth.signInWithPassword(credentials);
    const user = response.data.user?.email;
    const user_error = response.error?.message;
    return { user, user_error };
  }
);

export const user_register = createAsyncThunk(
  "user/register",
  async (credentials: { email: string; password: string }) => {
    const response = await supabase().auth.signUp(credentials);
    const user = response.data.user?.email;
    const user_error = response.error?.message;
    return { user, user_error };
  }
);

export const user_signout = createAsyncThunk("user/signout", async () => {
  const response = await supabase().auth.signOut();
  const user = null;
  const user_error = response.error?.message;
  return { user, user_error };
});
/**
 *  A user slice that will update user and set an error if there is any
 */
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset_error(state) {
      state.user_error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(update_user.fulfilled, (state, action) => {
      state.user = action.payload.user || null;
    });
    builder.addCase(user_login.fulfilled, (state, action) => {
      state.user = action.payload.user || null;
      state.user_error = action.payload.user_error || null;
    });
    builder.addCase(user_register.fulfilled, (state, action) => {
      state.user = action.payload.user || null;
      state.user_error = action.payload.user_error || null;
    });
    builder.addCase(user_signout.fulfilled, (state, action) => {
      state.user = action.payload.user || null;
      state.user_error = action.payload.user_error || null;
    });
  },
});

export const { reset_error } = userSlice.actions;
export default userSlice.reducer;
