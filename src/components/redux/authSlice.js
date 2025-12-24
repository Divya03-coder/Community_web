import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* =========================
   AXIOS INSTANCE
========================= */
const api = axios.create({
  baseURL: "http://192.168.29.86:5001/api",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* =========================
   STORAGE HELPERS
========================= */
const saveAuth = (user, token) => {
  if (user && token) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }
};

const clearAuth = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

/* =========================
   ASYNC THUNKS
========================= */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/unified-login", credentials);
      return res.data; // { success, data: { user, token } }
    } catch (err) {
      return rejectWithValue({
        message:
          err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.message ||
          "Login failed",
      });
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/unified-signup", data);
      return res.data;
    } catch (err) {
      return rejectWithValue({
        message:
          err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.message ||
          "Registration failed",
      });
    }
  }
);

/*
  OPTIONAL:
  Use only if you truly need server validation on reload.
  Otherwise, you can REMOVE this thunk entirely.
*/
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/me");
      return res.data; // { user }
    } catch {
      return rejectWithValue("Session expired");
    }
  }
);

/* =========================
   INITIAL STATE (HYDRATION)
========================= */
let storedUser = null;
try {
  storedUser = JSON.parse(localStorage.getItem("user"));
} catch {
  storedUser = null;
}

const storedToken = localStorage.getItem("token");

const initialState = {
  user: storedUser,
  token: storedToken,
  isAuthenticated: Boolean(storedUser && storedToken),

  loginLoading: false,
  loginError: null,

  registerLoading: false,
  registerError: null,

  checkingAuth: false,
};

/* =========================
   SLICE
========================= */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loginError = null;
      state.registerError = null;
      clearAuth();
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== LOGIN ===== */
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;

        const user = action.payload?.data?.user;
        const token = action.payload?.data?.token;

        if (user && token) {
          state.user = user;
          state.token = token;
          state.isAuthenticated = true;
          saveAuth(user, token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      })

      /* ===== REGISTER ===== */
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerLoading = false;

        const user = action.payload?.data?.user;
        const token = action.payload?.data?.token;

        if (user && token) {
          state.user = user;
          state.token = token;
          state.isAuthenticated = true;
          saveAuth(user, token);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = action.payload;
      })

      /* ===== CHECK AUTH (OPTIONAL) ===== */
      .addCase(checkAuth.pending, (state) => {
        state.checkingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.checkingAuth = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        saveAuth(action.payload.user, state.token);
      })
      .addCase(checkAuth.rejected, (state) => {
        state.checkingAuth = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
