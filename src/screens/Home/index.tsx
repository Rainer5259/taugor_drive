import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import WelcomeComponent from '~/components/WelcomeComponent';
import {AppScreens} from '~/routes/AppScreens';
import {useTypedNavigation} from '~/routes/useTypedNavigation';

const HomeScreen: React.FC = () => {
  const navigation = useTypedNavigation();
  const navigateToUploadScreen = () => {
    navigation.reset({index: 0, routes: [{name: AppScreens.Upload}]});
    return;
  };

  return (
    <View style={styles.container}>
      <WelcomeComponent onPress={navigateToUploadScreen} />
    </View>
  );
};

export default HomeScreen;
