export type HomeRootParamsList = {
  Home: undefined;
  Upload: undefined;
};

export enum HomeScreenEnum {
  Home = 'Home',
  Upload = 'Upload',
}

export type HomeScreenEnumType = keyof HomeRootParamsList;
