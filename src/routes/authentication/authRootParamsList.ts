export type AuthRootParamsList = {
  Login: undefined;
};

export enum AuthScreenEnum {
  Login = 'Login',
}

export type AuthScreenEnumType = keyof AuthRootParamsList;
