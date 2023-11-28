import {
  AuthRootParamsList,
  AuthScreenEnum,
} from './authentication/authRootParamsList';
import {HomeRootParamsList, HomeScreenEnum} from './home/homeRootParamsList';

export const AppScreens = {
  ...AuthScreenEnum,
  ...HomeScreenEnum,
} as const;

export type RootStackParamList = AuthRootParamsList & HomeRootParamsList;

export type AppScreens = keyof typeof AppScreens;
