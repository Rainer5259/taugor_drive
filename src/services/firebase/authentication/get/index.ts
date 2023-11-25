import {UserCredential, User, signInWithEmailAndPassword} from 'firebase/auth';
import {FirebaseError} from 'firebase/app';
import {authenticationService} from '../initialize';

export class AuthGet {
  signInWithEmailAndPassword = (
    email: string,
    password: string,
  ): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
      signInWithEmailAndPassword(authenticationService, email, password)
        .then((userCredential: UserCredential) => {
          resolve(userCredential.user);
        })
        .catch(error => {
          reject(error as FirebaseError);
        });
    });
  };
}
