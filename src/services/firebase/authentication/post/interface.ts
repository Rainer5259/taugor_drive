import {User} from 'firebase/auth';

export interface AuthPostInterface {
  signUpWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<User>;
}
