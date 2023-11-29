import {StyleSheet} from 'react-native';
import {colors} from '~/shared/themes/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },

  safeAreaView: {flex: 1, backgroundColor: colors.primaryBackground},

  keyboardAvoidingView: {
    flex: 1,
  },
});
