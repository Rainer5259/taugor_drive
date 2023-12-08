import {TextInputProps, TextStyle, ViewStyle} from 'react-native';

export interface TextInputDefaultProps extends TextInputProps {
  style?: TextStyle & object;
}
