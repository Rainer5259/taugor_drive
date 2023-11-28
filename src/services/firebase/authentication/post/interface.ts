import {User} from 'firebase/auth';
import {User as UserGoogle} from '@react-native-google-signin/google-signin/src/types';
import {UserProps} from '~/services/redux/slices/interface';
export interface AuthPostInterface {
  signUpWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<User>;

  signInWithGooglePopup: () => Promise<UserProps>;
}
