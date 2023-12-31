import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {AppUserInterface} from '../user';
import {FirebaseStorageTypes} from '@react-native-firebase/storage';

export interface AppDocumentInterface
  extends FirebaseStorageTypes.TaskSnapshot,
    AppUserInterface {
  title: string;
  searchName: string;
  fileID: string;
  folderID: string;
  folder?: AppDocumentInterface[];
}

export interface AppFolderDocumentInterface extends AppDocumentInterface {
  folderTitle?: string;
  isFolder?: boolean;
}
export interface IFirebaseDocChangeData
  extends FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> {}
