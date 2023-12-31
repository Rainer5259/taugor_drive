import {TextStyle, TouchableOpacityProps, ViewStyle} from 'react-native';

export interface ButtonDefaultProps extends TouchableOpacityProps {
  title?: string;
  loading?: boolean;
  style?: ViewStyle & object;
  textStyle?: TextStyle & object;
  children?: React.ReactNode;
  disabledAnimation?: boolean;
}
