export type HomeRootParamsList = {
  Home: undefined;
  Upload: undefined;
  Files: undefined;
  FilesFolder: {folderID: string};
};

export enum HomeScreenEnum {
  Home = 'Home',
  Upload = 'Upload',
  Files = 'Files',
  FilesFolder = 'FilesFolder',
}

export type HomeScreenEnumType = keyof HomeRootParamsList;
