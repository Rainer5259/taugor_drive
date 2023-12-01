import {getStorage} from 'firebase/storage';
import {firebaseInitializeService} from '..';

export const getStorageFirebaseService = getStorage(firebaseInitializeService);
