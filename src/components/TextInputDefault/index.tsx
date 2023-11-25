import React, {FC} from 'react';
import {TextInput} from 'react-native';
import {TextInputDefaultProps} from './interface';
import {styles} from './styles';

const TextInputDefault: FC<TextInputDefaultProps> = ({style, ...rest}) => {
  return <TextInput style={[styles.container, style]} {...rest} />;
};

export default TextInputDefault;
