import {User} from 'firebase/auth';
import {AuthPost} from './authentication/post';
import {AuthPostInterface} from './authentication/post/interface';
import {AuthGet} from './authentication/get';
import {AuthGetInterface} from './authentication/get/interface';

class FirebaseServices {
  private authPostService: AuthPostInterface;
  private authGetService: AuthGetInterface;

  constructor() {
    this.authPostService = new AuthPost();
    this.authGetService = new AuthGet();
  }

  authentication = {
    get: {
      signUpWithEmailAndPassword: (
        email: string,
        password: string,
      ): Promise<User> => {
        return this.authGetService.signInWithEmailAndPassword(email, password);
      },
    },

    post: {
      signUpWithEmailAndPassword: (
        email: string,
        password: string,
      ): Promise<User> => {
        return this.authPostService.signUpWithEmailAndPassword(email, password);
      },
    },
  };
}

export default new FirebaseServices();
