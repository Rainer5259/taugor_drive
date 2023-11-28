import {
  UserCredential,
  User,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import {FirebaseError} from 'firebase/app';
import {authenticationService} from '../initialize';
import SInfo from 'react-native-sensitive-info';
import {LOCAL_STORAGE_SECRET_KEY} from '@env';
import {authGoogleProvider, googleProvider} from '../../app/googleProvider';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {User as UserGoogle} from '@react-native-google-signin/google-signin/src/types';
import {Locales} from '~/shared/utils/enums/locales';
import {setToken} from '~/services/redux/slices/authenticateUser';
import {useDispatch} from 'react-redux';
import {AppDispatch, store} from '~/services/redux/store';
import {userGoogleData} from '~/services/redux/thunks/fetchUserData';
import {UserProps} from '~/services/redux/slices/interface';
export class AuthPost {
  signUpWithEmailAndPassword = async (
    email: string,
    password: string,
  ): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
      createUserWithEmailAndPassword(authenticationService, email, password)
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

  signInWithGooglePopup = async (): Promise<UserProps> => {
    return new Promise<UserProps>(async (resolve, reject) => {
      const pro = new GoogleAuthProvider();
      pro.setDefaultLanguage(Locales.PT_BR);
      googleProvider.setDefaultLanguage(Locales.PT_BR);

      await GoogleSignin.hasPlayServices();

      await GoogleSignin.signIn()
        .then(response => {
          const user: UserProps = {
            id: response.user.id,
            token: response.idToken!,
          };
          SInfo.setItem(LOCAL_STORAGE_SECRET_KEY, response.idToken!, {});
          resolve(user);
        })
        .catch(error => {
          reject(error);
        });

      // store.dispatch({type: 'user/userGoogleData', payload: userInfo});
      // const googleCredentials = GoogleAuthProvider.credential(idToken);
      // await signInWithCredential(authenticationService, googleCredentials);
    });
  };
}
