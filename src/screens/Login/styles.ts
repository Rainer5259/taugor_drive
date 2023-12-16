import {StyleSheet} from 'react-native';
import {colors} from '~/shared/themes/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeAreaView: {
    backgroundColor: colors.primaryBackground,
    flex: 1,
  },

  keyboardAvoidingView: {
    flex: 1,
  },
});
