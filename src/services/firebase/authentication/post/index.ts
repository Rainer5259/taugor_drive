import {
  UserCredential,
  User,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {FirebaseError} from 'firebase/app';
import {authenticationService} from '../initialize';

export class AuthPost {
  signUpWithEmailAndPassword = (
    email: string,
    password: string,
  ): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
      createUserWithEmailAndPassword(authenticationService, email, password)
        .then((userCredential: UserCredential) => {
          resolve(userCredential.user);
        })
        .catch(error => {
          reject(error as FirebaseError);
        });
    });
  };
}
