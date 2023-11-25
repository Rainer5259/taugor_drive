import {TextStyle, TouchableOpacityProps, ViewStyle} from 'react-native';

export interface ButtonDefaultProps extends TouchableOpacityProps {
  title?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
}
