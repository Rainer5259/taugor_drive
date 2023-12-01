import {Dispatch, SetStateAction} from 'react';

export interface UploadComponentProps {
  onPressChooseFile: () => void;
  onPressSeeMyFiles: () => void;
  size: number;
  title: string;
  hasDocumentPicked: boolean;
  onPressRemoveDocumentPicked: () => void;
}
