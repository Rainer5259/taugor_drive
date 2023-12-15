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
import {useDispatch, useSelector} from 'react-redux';
import {setToken, setUser} from '~/services/redux/slices/authenticateUser';
import {LOCAL_STORAGE_SECRET_KEY} from '@env';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {RootState} from '~/services/redux/store';

const Header: FC<HeaderProps> = ({left, right, title}) => {
  const navigation = useTypedNavigation();
  const dispatch = useDispatch();
  const {uploading} = useSelector((state: RootState) => state.user);
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
    dispatch(setUser(null));
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

      default:
        null;
    }
  };

  const handlePressRight = () => {
    switch (right) {
      case 'logout':
        handleLogout();
        break;
      default:
        null;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.left}
        disabled={!left}
        onPress={handlePressLeft}
        activeOpacity={0.6}>
        {renderLeftContent()}
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        style={[styles.logout, uploading && {opacity: 0.6}]}
        disabled={!right || uploading}
        onPress={handlePressRight}
        activeOpacity={0.3}>
        {renderRightContent()}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
