import {Dispatch, SetStateAction} from 'react';

export interface AuthCardProps {
  email: string;
  password: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  onPressSignIn: () => void;
  onPressSignUp: () => void;
  onPressForgotPassword: () => void;
}
