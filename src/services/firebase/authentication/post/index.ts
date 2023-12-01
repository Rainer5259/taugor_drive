import {
  UserCredential,
  User,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from 'firebase/auth';
import {FirebaseError} from 'firebase/app';
import {authenticationService} from '../initialize';
import SInfo from 'react-native-sensitive-info';
import {LOCAL_STORAGE_SECRET_KEY} from '@env';
import {googleProvider} from '../../app/googleProvider';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Locales} from '~/shared/utils/enums/locales';
import {AppUserCredentialInterface} from '~/shared/utils/types/user';
export class AuthPost {
  protected signUpWithEmailAndPassword = async (
    email: string,
    password: string,
  ): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
      createUserWithEmailAndPassword(authenticationService, email, password)
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

  protected signInWithGooglePopup =
    async (): Promise<AppUserCredentialInterface> => {
      return new Promise<AppUserCredentialInterface>(
        async (resolve, reject) => {
          const pro = new GoogleAuthProvider();
          pro.setDefaultLanguage(Locales.PT_BR);
          googleProvider.setDefaultLanguage(Locales.PT_BR);

          await GoogleSignin.hasPlayServices();

          await GoogleSignin.signIn()
            .then(response => {
              const user: AppUserCredentialInterface = {
                id: response.user.id,
                token: response.idToken!,
              };

              SInfo.setItem(LOCAL_STORAGE_SECRET_KEY, JSON.stringify(user), {});
              resolve(user);
            })
            .catch(error => {
              reject(error);
            });
        },
      );
    };
}

export class AuthenticationPostServices extends AuthPost {
  constructor() {
    super();
  }
  async signUpWithEmail(email: string, password: string): Promise<User> {
    const response = await this.signUpWithEmailAndPassword(email, password);
    return response;
  }

  async signInWithGoogle(): Promise<AppUserCredentialInterface> {
    const response = await this.signInWithGooglePopup();
    return response;
  }
}

export const authenticationPostService = {};
