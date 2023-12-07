import {Dispatch, SetStateAction} from 'react';

export interface UploadComponentProps {
  onPressChooseFile: () => void;
  onPressSeeMyFiles: () => void;
  size: number;
  title: string;
  setTitle: Dispatch<SetStateAction<string | null>>;
  hasDocumentPicked: boolean;
  onPressRemoveDocumentPicked: () => void;
}
