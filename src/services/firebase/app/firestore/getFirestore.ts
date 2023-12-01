import {getFirestore} from 'firebase/firestore';
import {firebaseInitializeService} from '..';

export const getFirestoreService = getFirestore(firebaseInitializeService);
