export type HomeRootParamsList = {
  Home: undefined;
  Upload: undefined;
  Files: undefined;
};

export enum HomeScreenEnum {
  Home = 'Home',
  Upload = 'Upload',
  Files = 'Files',
}

export type HomeScreenEnumType = keyof HomeRootParamsList;
