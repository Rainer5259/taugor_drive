import {User} from 'firebase/auth';
import {AuthPost} from './authentication/post';
import {AuthPostInterface} from './authentication/post/interface';
import {AuthGet} from './authentication/get';
import {AuthGetInterface} from './authentication/get/interface';
import {UserProps} from '../redux/slices/interface';
class FirebaseServices {
  private authPostService: AuthPostInterface;
  private authGetService: AuthGetInterface;

  constructor() {
    this.authPostService = new AuthPost();
    this.authGetService = new AuthGet();
  }

  authentication = {
    get: {
      signUpWithEmailAndPassword: async (
        email: string,
        password: string,
      ): Promise<User> => {
        return this.authGetService.signInWithEmailAndPassword(email, password);
      },
      requestPasswordResetEmail: async (email: string): Promise<void> => {
        return this.authGetService.sendPasswordResetEmail(email);
      },
    },

    post: {
      signUpWithEmailAndPassword: async (
        email: string,
        password: string,
      ): Promise<User> => {
        return this.authPostService.signUpWithEmailAndPassword(email, password);
      },

      signInWithGooglePopup: async (): Promise<UserProps> => {
        return this.authPostService.signInWithGooglePopup();
      },
    },
  };
}

export default new FirebaseServices();
