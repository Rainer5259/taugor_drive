import {ViewStyle} from 'react-native';

export interface HeaderProps {
  left?: 'chevron-left' | 'files' | 'folder' | undefined;
  right?: 'logout' | undefined;
  title: string;
  style?: ViewStyle;
}
