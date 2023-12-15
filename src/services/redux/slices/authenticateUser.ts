import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {AppUserInterface} from '~/shared/utils/types/user';
import {AuthenticateUserProps} from './interface';

const limitUpload = 2 * Math.pow(1024, 3);

const initialState: AuthenticateUserProps = {
  token: null,
  user: null,
  limitUpload,
  uploading: false,
  totalBytesUsed: 0,
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
