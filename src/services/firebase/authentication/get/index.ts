import {
  UserCredential,
  User,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {FirebaseError} from 'firebase/app';
import {authenticationService} from '../initialize';
import SInfo from 'react-native-sensitive-info';
import {LOCAL_STORAGE_SECRET_KEY} from '@env';
import {AppUserCredentialInterface} from '~/shared/utils/types/user';
export abstract class AuthGet {
  protected signInWithEmailAndPassword = async (
    email: string,
    password: string,
  ): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
      signInWithEmailAndPassword(authenticationService, email, password)
        .then((userCredential: UserCredential) => {
          const user: AppUserCredentialInterface = {
            id: userCredential.user.uid,
            token: userCredential.user.refreshToken!,
          };

          SInfo.setItem(LOCAL_STORAGE_SECRET_KEY, JSON.stringify(user), {});
          resolve(userCredential.user);
        })
        .catch(error => {
          reject(error as FirebaseError);
        });
    });
  };

  protected sendPasswordResetEmail = async (email: string): Promise<void> => {
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

export class AuthenticationGetServices extends AuthGet {
  constructor() {
    super();
  }
  async signInWithEmail(email: string, password: string): Promise<User> {
    const response = await this.signInWithEmailAndPassword(email, password);
    return response;
  }

  async resetPasswordWithEmail(email: string): Promise<void> {
    const response = await this.sendPasswordResetEmail(email);
    return response;
  }
}
