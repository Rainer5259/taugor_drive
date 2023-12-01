import {DocumentPickerResponse, types} from 'react-native-document-picker';
import {AppUserInterface} from '../user';

export interface AppDocumentInterface
  extends DocumentPickerResponse,
    AppUserInterface {
  created_at: Date;
  updated_at: Date;
}
