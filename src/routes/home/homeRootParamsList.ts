export type HomeRootParamsList = {
  Home: undefined;
};

export enum HomeScreenEnum {
  Home = 'Home',
}

export type HomeScreenEnumType = keyof HomeRootParamsList;
