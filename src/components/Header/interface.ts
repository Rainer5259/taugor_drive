export interface HeaderProps {
  left?: 'chevron-left' | undefined;
  right?: 'logout' | undefined;
  onPressRight?: () => void;
  onPressLeft?: () => void;
}
