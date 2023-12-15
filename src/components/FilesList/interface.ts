import {Dispatch, SetStateAction} from 'react';
import {ViewStyle} from 'react-native';
import {AppDocumentInterface} from '~/shared/utils/types/document';

export interface FilesListProps {
  searchName: string;
  documentsData: AppDocumentInterface[];
  searchData: AppDocumentInterface[];
  setSelectedFileID?: Dispatch<SetStateAction<string | null>>;
  style?: ViewStyle;
  folderTitle?: string;
  isFolder?: boolean;
}
