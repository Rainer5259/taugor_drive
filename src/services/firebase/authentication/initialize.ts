import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import {firebaseInitializeService} from '../app';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const authInitialize = initializeAuth(firebaseInitializeService, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const authenticationService = getAuth(authInitialize.app);
