import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "src/lib/supabase";
import {saveUserPreferences} from "src/api/preferences";

// Initial user state is going to be email fetched from Supabase if they have an active session
const initialState = {
  user: null as string | null,
  error: null as string | null,
};

const test = supabase()
  .auth.getUser()
  .then((response) => {
    return response.data.user?.email ? response.data.user.email : null;
  });

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
    const user = (await supabase().auth.signInWithPassword({ email, password })).data
      .user?.email;

    // Sync preferences to Supabase after login
    if (user) {
      const onboardingComplete = localStorage.getItem("onboardingComplete");
      const userInterests = JSON.parse(localStorage.getItem("userInterests") || "[]");
      const userTraits = JSON.parse(localStorage.getItem("userTraits") || "[]");
      const preferences = [...userInterests, ...userTraits];
      if (onboardingComplete && preferences.length > 0) {
        console.log("[Login Thunk] Syncing preferences to Supabase after login:", preferences);
        await saveUserPreferences(preferences);
      }
    }

    return user;
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

// Thunk to save preferences to Supabase 
export const savePreferences = createAsyncThunk(
  "user/savePreferences",
  async (preferences: string[], { rejectWithValue }) => {
    console.log("[Redux] savePreferences thunk called with:", preferences);
    const result = await saveUserPreferences(preferences); 
    if (result.error) {
      console.log("[Redux] savePreferences thunk error:", result.error);
      return rejectWithValue(result.error);
    }
    console.log("[Redux] savePreferences thunk success:", result.message);
    return result.message;
  }
);

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
