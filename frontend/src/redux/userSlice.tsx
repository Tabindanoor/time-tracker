// redux/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  user: User | null;
  token: string | null;
  status: string | null;
}

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface RegisterUserResponse {
  message: string;
}

interface LoginUserResponse {
  user: User;
  token: string;
}

export const registerUser = createAsyncThunk<RegisterUserResponse, { username: string; email: string; password: string }>(
  'user/register',
  async (userData) => {
    const response = await axios.post('/api/auth/register', userData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk<LoginUserResponse, { email: string; password: string }>(
  'user/login',
  async (userData) => {
    const response = await axios.post('/api/auth/login', userData);
    return response.data;
  }
);

const initialState: UserState = { user: null, token: null, status: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<RegisterUserResponse>) => {
        state.status = 'registered';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginUserResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      });
  },
});

export default userSlice.reducer;
