import {GoogleAuthProvider} from 'firebase/auth';

export const googleProvider = new GoogleAuthProvider();

export const authGoogleProvider = googleProvider.addScope(
  'https://www.googleapis.com/auth/contacts.readonly',
);
