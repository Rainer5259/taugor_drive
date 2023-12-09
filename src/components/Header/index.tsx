import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import ChevronLeft from '~/assets/svgs/chevron-left-icon.svg';
import Folder from '~/assets/svgs/folder-icon.svg';
import Logout from '~/assets/svgs/logout-icon.svg';
import {t} from 'i18next';
import {AppScreens} from '~/routes/AppScreens';
import {HeaderProps} from './interface';
import SInfo from 'react-native-sensitive-info';
import {useTypedNavigation} from '~/routes/useTypedNavigation';
import {useDispatch} from 'react-redux';
import {setToken} from '~/services/redux/slices/authenticateUser';
import {LOCAL_STORAGE_SECRET_KEY} from '@env';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Header: FC<HeaderProps> = ({left, right, title}) => {
  const navigation = useTypedNavigation();
  const dispatch = useDispatch();

  const renderLeftContent = () => {
    switch (left) {
      case 'chevron-left':
        return <ChevronLeft />;

      case 'files':
        return <Folder width={21} height={21} />;

      default:
        break;
    }
  };

  const renderRightContent = () => {
    switch (right) {
      case 'logout':
        return <Logout />;
    }
  };

  const navigationGoBack = () => {
    navigation.goBack();
  };

  const navigateToFolders = () => {
    navigation.navigate('Files');
  };

  const handleLogout = async () => {
    SInfo.deleteItem(LOCAL_STORAGE_SECRET_KEY, {});
    dispatch(setToken(null));
    const isSignedIn = await GoogleSignin.isSignedIn();

    if (isSignedIn) {
      await GoogleSignin.signOut();
    }
  };

  const handlePressLeft = () => {
    switch (left) {
      case 'chevron-left':
        navigationGoBack();
        break;

      case 'files':
        navigateToFolders();
        break;
    }
  };

  const handlePressRight = () => {
    switch (right) {
      case 'logout':
        handleLogout();
        break;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.chevronLeft}
        disabled={!left}
        onPress={handlePressLeft}
        activeOpacity={0.6}>
        {renderLeftContent()}
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        style={styles.logout}
        disabled={!right}
        onPress={handlePressRight}
        activeOpacity={0.6}>
        {renderRightContent()}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
