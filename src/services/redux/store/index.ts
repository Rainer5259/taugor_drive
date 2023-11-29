import {configureStore} from '@reduxjs/toolkit';
import UserSlice from '../slices/authenticateUser';

export const store = configureStore({
  reducer: {user: UserSlice},
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
