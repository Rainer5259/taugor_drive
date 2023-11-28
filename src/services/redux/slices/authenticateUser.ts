import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
// import {fetchUserData} from '../thunks/fetchUserData';
import {User} from 'firebase/auth';
import {userGoogleData} from '../thunks/fetchUserData';
import {User as UserGoogle} from '@react-native-google-signin/google-signin/src/types';
import {UserProps} from './interface';

export interface AuthenticateUserProps {
  token: string | null;
  user: UserProps | null;
  roundedAvatar: boolean;
  error: boolean;
  loading: boolean;
  errorMessage: string;
}

const initialState: AuthenticateUserProps = {
  token: null,
  user: null,
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
    setUser: (state, action: PayloadAction<UserProps | null>) => {
      state.user = action.payload;
    },
    setRoundedAvatar: (state, action: PayloadAction<boolean | false>) => {
      state.roundedAvatar = action.payload;
    },
  },

  // extraReducers: builder => {
  //   builder.addCase(userGoogleData.pending, state => {
  //     state.loading = true;
  //     console.log('buidADdCaseFullPedding');
  //   });
  //   builder.addCase(userGoogleData.fulfilled, (state, action) => {
  //     state.loading = false;
  //     state.error = false;
  //     state.user = action.payload ?? null;
  //     console.log('buidADdCaseFullFielled');
  //   });
  //   builder.addCase(userGoogleData.rejected, (state, action) => {
  //     console.log('buidADdCaseRejected');
  //     state.loading = false;
  //     state.error = true;
  //     state.errorMessage = action.error.message ?? '';
  //   });
  // },
});

export const {setToken, setUser, setRoundedAvatar} =
  authenticateUserSlice.actions;

export default authenticateUserSlice.reducer;
