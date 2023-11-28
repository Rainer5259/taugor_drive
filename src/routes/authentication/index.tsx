import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '~/screens/Login';
import {AuthRootParamsList} from './authRootParamsList';
// import {AppScreens} from '../AppScreens';

const AuthenticationStack = () => {
  const Stack = createNativeStackNavigator<AuthRootParamsList>();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Login'} component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthenticationStack;
