import {FirebaseApp} from 'firebase/app';
import {firebaseInitializeService} from './app';
import {authenticationInitializeService} from './authentication';
import {Auth} from 'firebase/auth';

export class FirebaseServices {
  private initialize: FirebaseApp = firebaseInitializeService;
  private authentication: Auth = authenticationInitializeService;
  constructor() {}
}
