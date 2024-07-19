import axiosInstance from './axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: any | null;
  token: string;
  loading: boolean;
  error: string | null;
}

interface AuthResponse {
  user: any;
  token: string;
}

interface AuthCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token') || '',
  loading: false,
  error: null,
};

export const login: any = createAsyncThunk<AuthResponse, AuthCredentials>(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/signin', { email, password });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signup: any = createAsyncThunk<AuthResponse, AuthCredentials>(
  'auth/signup',
  async ({ email, password, firstName, lastName, confirmPassword }, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/create-user', {
        email,
        firstName,
        lastName,
        password,
        confirmPassword
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = '';
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem('token', action.payload.token);
        }
      )
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signup.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(signup.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
