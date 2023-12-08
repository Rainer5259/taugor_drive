import {Dispatch, SetStateAction} from 'react';

export interface UploadComponentProps {
  onPressChooseFile: () => void;
  size: number;
  title: string;
  setTitle: Dispatch<SetStateAction<string | null>>;
  hasDocumentPicked: boolean;
  onPressRemoveDocumentPicked: () => void;
}

export type SizeReferenceType = 'B' | 'Bytes' | 'KB' | 'MB' | 'GB';
