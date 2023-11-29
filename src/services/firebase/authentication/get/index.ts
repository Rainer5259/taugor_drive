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
import SInfo from 'react-native-sensitive-info';
import {LOCAL_STORAGE_SECRET_KEY} from '@env';
export class AuthGet {
  signInWithEmailAndPassword = async (
    email: string,
    password: string,
  ): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
      signInWithEmailAndPassword(authenticationService, email, password)
        .then((userCredential: UserCredential) => {
          SInfo.setItem(
            LOCAL_STORAGE_SECRET_KEY,
            userCredential.user.refreshToken,
            {},
          );
          resolve(userCredential.user);
        })
        .catch(error => {
          reject(error as FirebaseError);
        });
    });
  };

  sendPasswordResetEmail = async (email: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      sendPasswordResetEmail(authenticationService, email)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error as FirebaseError);
        });
    });
  };
}
