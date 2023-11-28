import {useNavigation as useReactNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './AppScreens';

export const useTypedNavigation = () => {
  return useReactNavigation<NativeStackNavigationProp<RootStackParamList>>();
};
