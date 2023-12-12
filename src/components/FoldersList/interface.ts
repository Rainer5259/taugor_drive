import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {Dispatch, SetStateAction} from 'react';
import {ViewStyle} from 'react-native';

export interface FoldersListProps {
  selectedFolderID: string;
  setSelectedFolderID: Dispatch<SetStateAction<string>>;
  onPressFolder?: () => void;
  addNewFolderButton?: boolean;
  style?: ViewStyle;
}
