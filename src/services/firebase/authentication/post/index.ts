import authentication, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import SInfo from 'react-native-sensitive-info';
import {LOCAL_STORAGE_SECRET_KEY} from '@env';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AppUserCredentialInterface} from '~/shared/utils/types/user';
export class AuthPost {
  protected signUpWithEmailAndPassword = async (
    email: string,
    password: string,
  ): Promise<AppUserCredentialInterface> => {
    return new Promise<AppUserCredentialInterface>(async (resolve, reject) => {
      await authentication()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential: FirebaseAuthTypes.UserCredential) => {
          let token = '';
          userCredential.user
            .getIdToken()
            .then(tokenRes => {
              token = tokenRes;
              const user: AppUserCredentialInterface = {
                id: userCredential.user.uid,
                token,
              };

              SInfo.setItem(LOCAL_STORAGE_SECRET_KEY, JSON.stringify(user), {});

              resolve(user);
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  protected signInWithGooglePopup =
    async (): Promise<AppUserCredentialInterface> => {
      return new Promise<AppUserCredentialInterface>(
        async (resolve, reject) => {
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

  async signUpWithEmail(
    email: string,
    password: string,
  ): Promise<AppUserCredentialInterface> {
    const response = await this.signUpWithEmailAndPassword(email, password);
    return response;
  }

  async signInWithGoogle(): Promise<AppUserCredentialInterface> {
    const response = await this.signInWithGooglePopup();
    return response;
  }
}
