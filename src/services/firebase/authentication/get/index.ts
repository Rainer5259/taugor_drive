import {
  UserCredential,
  User,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from 'firebase/auth';
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

  sendPasswordResetEmail = (email: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      sendPasswordResetEmail(authenticationService, email)
        .then(() => {
          return;
        })
        .catch(error => {
          reject(error as FirebaseError);
        });
    });
  };
}
