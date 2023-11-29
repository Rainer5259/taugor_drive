import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import ChevronLeft from '~/assets/svgs/chevron-left-icon.svg';
import Logout from '~/assets/svgs/logout-icon.svg';
import {t} from 'i18next';
import {AppScreens} from '~/routes/AppScreens';
import {HeaderProps} from './interface';
import SInfo from 'react-native-sensitive-info';
import {useTypedNavigation} from '~/routes/useTypedNavigation';
import {useDispatch} from 'react-redux';
import {setToken} from '~/services/redux/slices/authenticateUser';
import {LOCAL_STORAGE_SECRET_KEY} from '@env';

const Header: FC<HeaderProps> = ({left, right, onPressLeft, onPressRight}) => {
  const navigation = useTypedNavigation();
  const dispatch = useDispatch();

  const renderLeftContent = () => {
    switch (left) {
      case 'chevron-left':
        return <ChevronLeft />;

      default:
        break;
    }
  };

  const renderRightContent = () => {
    switch (right) {
      case 'logout':
        return <Logout />;

      default:
        break;
    }
  };

  const navigationGoBack = () => {
    navigation.goBack();
  };

  const handleLogout = () => {
    SInfo.deleteItem(LOCAL_STORAGE_SECRET_KEY, {});
    dispatch(setToken(null));
  };

  const handlePressLeft = () => {
    switch (left) {
      case 'chevron-left':
        navigationGoBack();
        break;
    }
  };

  const handlePressRight = () => {
    switch (right) {
      case 'logout':
        handleLogout();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.chevronLeft}
        disabled={!left}
        onPress={handlePressLeft}>
        {renderLeftContent()}
      </TouchableOpacity>
      <Text style={styles.title}>{AppScreens.Upload}</Text>
      <TouchableOpacity
        style={styles.logout}
        disabled={!right}
        onPress={handlePressRight}>
        {renderRightContent()}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
