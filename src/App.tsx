import React, {useEffect} from 'react';
import Routes from './routes';
import Toast from 'react-native-toast-message';
import '~/shared/i18n';
import {Provider} from 'react-redux';
import {store} from './services/redux/store';
import '~/services/firebase/app/GoogleSignin';
import {setToken, setUser} from '~/services/redux/slices/authenticateUser';
import SInfo from 'react-native-sensitive-info';
import {LOCAL_STORAGE_SECRET_KEY} from '@env';
import {AppUserCredentialInterface} from './shared/utils/types/user';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const fetchUserInfoStoraged = async () => {
    try {
      const storagedUser = await SInfo.getItem(LOCAL_STORAGE_SECRET_KEY, {});

      if (storagedUser) {
        const userParsed: AppUserCredentialInterface = JSON.parse(storagedUser);

        store.dispatch(setToken(userParsed.token));
        store.dispatch(setUser({id: userParsed.id}));
      }
    } finally {
      SplashScreen.hide();
    }
  };

  useEffect(() => {
    fetchUserInfoStoraged();
  }, []);

  return (
    <>
      <Provider store={store}>
        <Routes />
      </Provider>
      <Toast autoHide visibilityTime={3000} position="top" topOffset={60} />
    </>
  );
};

export default App;
