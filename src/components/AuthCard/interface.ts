import {Dispatch, SetStateAction} from 'react';

export interface AuthCardProps {
  email: string;
  password: string;
  loadingSocialMedia?: boolean;
  loadingForgotPassword?: boolean;
  loadingSignIn?: boolean;
  loadingSignUp?: boolean;
  onPressSocialMedia: () => void;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  onPressSignIn: () => void;
  onPressSignUp: () => void;
  onPressForgotPassword: () => void;
}
