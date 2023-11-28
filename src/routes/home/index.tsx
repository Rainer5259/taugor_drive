import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '~/screens/Home';
import {HomeRootParamsList} from './homeRootParamsList';

const Stack = createNativeStackNavigator<HomeRootParamsList>();

function HomeStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={'Home'}
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;
