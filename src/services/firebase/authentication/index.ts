import {getAuth} from 'firebase/auth';
import {firebaseInitializeService} from '../app';

export const authenticationInitializeService = getAuth(
  firebaseInitializeService,
);
