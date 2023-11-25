import {User} from 'firebase/auth';
import {Authentication} from '~/services/firebase/authentication';

class FirebaseAuthenticationService extends Authentication {
  async signInUser(email: string, password: string): Promise<User> {
    const data = await this.signInWithEmailAndPassword(email, password);
    return data;
  }

  async signUpUser(email: string, password: string): Promise<User> {
    const data = await this.signUpWithEmailAndPassword(email, password);
    return data;
  }
}

export {FirebaseAuthenticationService};
