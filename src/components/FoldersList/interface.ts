import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {Dispatch, SetStateAction} from 'react';

export interface FoldersListProps {
  data: FirebaseFirestoreTypes.DocumentSnapshot[];
  selectedFolderID: string;
  setSelectedFolderID: Dispatch<SetStateAction<string>>;
}
