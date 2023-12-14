import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {AppUserInterface} from '~/shared/utils/types/user';

export interface AuthenticateUserProps {
  token: string | null;
  user: AppUserInterface | null;
  totalBytesUsed: number | null;
  roundedAvatar: boolean;
  uploading: boolean;
  error: boolean;
  loading: boolean;
  errorMessage: string;
}

const initialState: AuthenticateUserProps = {
  token: null,
  user: null,
  uploading: false,
  totalBytesUsed: null,
  roundedAvatar: false,
  error: false,
  loading: false,
  errorMessage: '',
};

export const authenticateUserSlice = createSlice({
  name: 'authenticateUser',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<AppUserInterface | null>) => {
      state.user = action.payload;
    },
    setTotalBytesUsed: (state, action: PayloadAction<number>) => {
      state.totalBytesUsed = action.payload;
    },
    setUploading: (state, action: PayloadAction<boolean>) => {
      state.uploading = action.payload;
    },
  },
});

export const {setToken, setUser, setTotalBytesUsed, setUploading} =
  authenticateUserSlice.actions;

export default authenticateUserSlice.reducer;
