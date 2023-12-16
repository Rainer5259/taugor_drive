import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '~/screens/Home';
import {HomeRootParamsList} from './homeRootParamsList';
import UploadScreen from '~/screens/Upload';
import {AppScreens} from '../AppScreens';
import FilesScreen from '~/screens/Files';
import FilesFolderScreen from '~/screens/FilesFolder';

const Stack = createNativeStackNavigator<HomeRootParamsList>();

function HomeStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={AppScreens.Home} component={HomeScreen} />
        <Stack.Screen name={AppScreens.Upload} component={UploadScreen} />
        <Stack.Screen name={AppScreens.Files} component={FilesScreen} />
        <Stack.Screen
          name={AppScreens.FilesFolder}
          component={FilesFolderScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;
