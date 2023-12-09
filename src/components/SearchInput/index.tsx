import React, {FC} from 'react';
import {TextInput} from 'react-native';
import {styles} from './styles';
import {t} from 'i18next';
import {SearchInputProps} from './interface';

const SearchInput: FC<SearchInputProps> = ({...rest}) => {
  return (
    <TextInput
      style={styles.container}
      clearButtonMode="always"
      placeholder={t('COMPONENTS.SEARCH_INPUT.PLACEHOLDER')}
      {...rest}
    />
  );
};

export default SearchInput;
