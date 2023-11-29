import {createAsyncThunk} from '@reduxjs/toolkit';
import {FirebaseError} from 'firebase/app';
import {AppDispatch} from '../store';

export const userGoogleData = createAsyncThunk(
  'user/userGoogleData',
  async data => {
    return async (dispatch: AppDispatch) => {
      console.log('tunk', data, dispatch);
      dispatch({type: 'USER_DATA', payload: data});
    };
  },
);
