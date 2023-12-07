import {AuthenticationPostServices} from './authentication/post';
import {AuthenticationGetServices} from './authentication/get';
import {FirestorePostServices} from './firestore/post';
import {StoragePostServices} from './storage/post';
import {FirestoreGetServices} from './firestore/get';
class FirebaseServices {
  private authenticationGet = new AuthenticationGetServices();
  private authenticationPost = new AuthenticationPostServices();
  private firestorePost = new FirestorePostServices();
  private firestoreGet = new FirestoreGetServices();
  private storagePost = new StoragePostServices();
  authentication = {
    get: this.authenticationGet,
    post: this.authenticationPost,
  };

  firestore = {
    post: this.firestorePost,
    get: this.firestoreGet,
  };

  storage = {
    post: this.storagePost,
  };
}

export default new FirebaseServices();
