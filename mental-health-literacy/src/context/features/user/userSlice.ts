import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "src/lib/supabase";
import { saveUserPreferences } from "src/api/preferences";

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

    // Sync preferences to Supabase after login
    if (user) {
      const onboardingComplete = localStorage.getItem("onboardingComplete");
      const userInterests = JSON.parse(
        localStorage.getItem("userInterests") || "[]"
      );
      const userTraits = JSON.parse(localStorage.getItem("userTraits") || "[]");
      const preferences = [...userInterests, ...userTraits];
      if (onboardingComplete && preferences.length > 0) {
        console.log(
          "[Login Thunk] Syncing preferences to Supabase after login:",
          preferences
        );
        await saveUserPreferences(preferences);
      }
    }

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

export const user_reset_password = createAsyncThunk(
  "user/reset_password",
  async ({ email }: { email: string }) => {
    const response = await supabase().auth.resetPasswordForEmail(email);
    const user_error = response.error?.message;
    return { user_error };
  }
);

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
    builder.addCase(user_reset_password.fulfilled, (state, action) => {
      state.user_error = action.payload.user_error || null;
    });
  },
});

export const { reset_error } = userSlice.actions;
export default userSlice.reducer;
