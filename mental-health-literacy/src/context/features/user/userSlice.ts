import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import store from "src/context/global_store";
import supabase from "src/lib/supabase";

// Initial user state is going to be email fetched from Supabase if they have an active session
const initialState = {
  user: "Guest" as string | null,
  error: null as string | null,
};

export const get_user = createAsyncThunk("user/get", async () => {
  return await supabase()
    .auth.getUser()
    .then((response) => {
      return response.data.user?.email ? response.data.user.email : null;
    });
});

export const update = createAsyncThunk("user/update", async () => {
  const response = (await supabase().auth.getUser()).data.user?.email;
  return response;
});

export const login = createAsyncThunk(
  "user/login",
  async (credentials: { email: string; password: string }) => {
    const { email, password } = credentials;
    return (await supabase().auth.signInWithPassword({ email, password })).data
      .user?.email;
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (credentials: { email: string; password: string }) => {
    const { email, password } = credentials;
    return (await supabase().auth.signUp({ email, password })).data.user?.email;
  }
);

export const signout = createAsyncThunk("user/signout", async () => {
  await supabase().auth.signOut();
  return null; // Return null to indicate user is signed out
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload ? action.payload : null;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload ? action.payload : null;
    });

    builder.addCase(signout.fulfilled, (state) => {
      state.user = null; // Set user to null on signout
    });
    builder.addCase(get_user.fulfilled, (state, action) => {
      state.user = action.payload ? action.payload : null;
    });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
