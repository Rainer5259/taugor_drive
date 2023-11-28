import {User} from 'firebase/auth';

export interface AuthGetInterface {
  signInWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<User>;

  sendPasswordResetEmail: (email: string) => Promise<void>;
}
