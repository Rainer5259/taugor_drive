import * as React from 'react';
import AuthenticationStack from './authentication';
import {useSelector} from 'react-redux';
import {RootState} from '~/services/redux/store';
import HomeStack from './home';

function Routes() {
  const token = useSelector((state: RootState) => state.user.token);

  return token ? <HomeStack /> : <AuthenticationStack />;
}

export default Routes;
