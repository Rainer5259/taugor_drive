export interface IconPerFileTypeProps {
  fileType: string;
  opacity?: number;
}

export const CommonMusicFilesType = [
  'mp3',
  'wav',
  'aac',
  'ogg',
  'flac',
] as const;

export const CommonVideoFilesType = [
  'mp4',
  'avi',
  'mkv',
  'mov',
  'wmv',
] as const;

export const CommonDocumentFilesType = [
  'pdf',
  'docx',
  'txt',
  'rtf',
  'csv',
] as const;

export const CommonImageFilesType = [
  'jpeg',
  'png',
  'gif',
  'svg',
  'bmp',
] as const;

export const CommonFilesType = [
  ...CommonMusicFilesType,
  ...CommonVideoFilesType,
  ...CommonDocumentFilesType,
  ...CommonImageFilesType,
  'zip',
  'rar',
  'tar',
  '7z',
  'html',
  'css',
  'js',
  'json',
  'xml',
  'exe',
  'msi',
  'dmg',
] as const;

// Exemplo de utilização:
export const musicFileType: (typeof CommonMusicFilesType)[number] =
  'mp3' || 'aac' || 'flac' || 'ogg' || 'wav';
export const videoFileType: (typeof CommonVideoFilesType)[number] =
  'mp4' || 'avi' || 'mkv' || 'mov' || 'wmv';
export const documentFileType: (typeof CommonDocumentFilesType)[number] = 'pdf';
export const imageFileType: (typeof CommonImageFilesType)[number] =
  'jpeg' || 'png';

export const anyFileType: (typeof CommonFilesType)[number] = 'zip';
