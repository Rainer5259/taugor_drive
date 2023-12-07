import firebaseAuth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import SInfo from 'react-native-sensitive-info';
import {LOCAL_STORAGE_SECRET_KEY} from '@env';
import {AppUserCredentialInterface} from '~/shared/utils/types/user';
import firebase from '../..';
export abstract class AuthGet {
  protected signInWithEmailAndPassword = async (
    email: string,
    password: string,
  ): Promise<AppUserCredentialInterface> => {
    return new Promise<AppUserCredentialInterface>((resolve, reject) => {
      firebaseAuth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential: FirebaseAuthTypes.UserCredential) => {
          let token = '';
          userCredential.user.getIdToken().then(tokenRes => {
            token = tokenRes;
            const user: AppUserCredentialInterface = {
              id: userCredential.user.uid,
              token,
            };

            SInfo.setItem(LOCAL_STORAGE_SECRET_KEY, JSON.stringify(user), {});
            resolve(user);
          });
          console.log('result token', token);
        })
        .catch(error => {
          const e = error as FirebaseAuthTypes.NativeFirebaseAuthError;
          console.log('result error', e.stack);
          reject(error as FirebaseAuthTypes.NativeFirebaseAuthError);
        });
    });
  };

  protected sendPasswordResetEmail = async (email: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      firebaseAuth()
        .sendPasswordResetEmail(email)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error as FirebaseError);
        });
    });
  };
}

export class AuthenticationGetServices extends AuthGet {
  constructor() {
    super();
  }
  async signInWithEmail(
    email: string,
    password: string,
  ): Promise<AppUserCredentialInterface> {
    const response = await this.signInWithEmailAndPassword(email, password);
    return response;
  }

  async resetPasswordWithEmail(email: string): Promise<void> {
    const response = await this.sendPasswordResetEmail(email);
    return response;
  }
}
