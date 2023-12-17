import {StyleSheet} from 'react-native';
import {colors} from '~/shared/themes/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },

  safeAreaView: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },

  keyboardAvoidingView: {
    flex: 1,
  },

  keyboardAvoidingViewContainer: {
    flex: 1,
  },

  keyboardAvoidingViewContent: {flex: 1, paddingTop: 80},

  header: {position: 'absolute', zIndex: 1},

  flatListBox: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    shadowColor: colors.primaryShadow,
    shadowOpacity: 0.2,
    shadowOffset: {height: 1, width: 0},
  },

  flatList: {
    borderLeftWidth: 0.6,
    borderColor: colors.secondaryCharcoal,
  },
});
