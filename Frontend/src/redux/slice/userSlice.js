import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from "../../api/userApi.js";

export const getSession = createAsyncThunk("user/getSession", async (_, thunkAPI) => {
  try {
    const res = await api.fetchUserSession();
    return res.data.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Session fetch failed");
  }
});

export const login = createAsyncThunk("user/login", async (formData, thunkAPI) => {
  try {
    const res = await api.loginUser(formData);
    return res.data.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const register = createAsyncThunk("user/register", async (formData, thunkAPI) => {
  try {
    const res = await api.registerUser(formData);
    return res.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Register failed");
  }
});

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    await api.logoutUser();
  } catch (error) {
    return thunkAPI.rejectWithValue("Logout failed");
  }
});

const initialState = {
  user: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSession.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getSession.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        // @ts-ignore
        state.error = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        // @ts-ignore
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;