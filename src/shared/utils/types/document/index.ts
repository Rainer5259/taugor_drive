import {AppUserInterface} from '../user';
import {FirebaseStorageTypes} from '@react-native-firebase/storage';

export interface AppDocumentInterface
  extends FirebaseStorageTypes.TaskSnapshot,
    AppUserInterface {
  title: string;
}
