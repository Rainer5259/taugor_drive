import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {ButtonDefaultProps} from './interface';
import {styles} from './styles';

const ButtonDefault: FC<ButtonDefaultProps> = ({
  title,
  children,
  style,
  textStyle,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      {...rest}
      activeOpacity={0.7}>
      {title && <Text style={textStyle}>{title}</Text>}
      {children}
    </TouchableOpacity>
  );
};

export default ButtonDefault;
