import React from 'react';
import Routes from './routes';
import Toast from 'react-native-toast-message';
import '~/shared/i18n';
import {Provider} from 'react-redux';
import {store} from './services/redux/store';
import '~/services/firebase/app/GoogleSignin';

const App = () => {
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
