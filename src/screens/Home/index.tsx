import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import ButtonDefault from '~/components/ButtonDefault';
import {setToken} from '~/services/redux/slices/authenticateUser';
import {useDispatch} from 'react-redux';
import {useTypedNavigation} from '~/routes/useTypedNavigation';
import {AppScreens} from '~/routes/AppScreens';
import {LOCAL_STORAGE_SECRET_KEY} from '@env';
import SInfo from 'react-native-sensitive-info';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useTypedNavigation();

  return (
    <View style={styles.container}>
      <ButtonDefault
        onPress={() => {
          SInfo.deleteItem(LOCAL_STORAGE_SECRET_KEY, {});
          navigation.reset({index: 0, routes: [{name: AppScreens.Home}]});
          dispatch(setToken(null));
        }}
      />
    </View>
  );
};

export default Home;
