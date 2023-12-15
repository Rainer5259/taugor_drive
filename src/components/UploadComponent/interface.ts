import {Dispatch, SetStateAction} from 'react';

export interface UploadComponentProps {
  onPressChooseFile: () => void;
  size: number;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  hasDocumentPicked: boolean;
  onPressRemoveDocumentPicked: () => void;
  pickingFile: boolean;
}

export type SizeReferenceType = 'B' | 'Bytes' | 'KB' | 'MB' | 'GB';
