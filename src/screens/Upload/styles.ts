import {StyleSheet} from 'react-native';
import {colors} from '~/shared/themes/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
    justifyContent: 'space-evenly',
  },

  safeAreaView: {flex: 1, backgroundColor: colors.primaryBackground},

  keyboardAvoidingView: {
    flex: 1,
  },

  listBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  createFolderButton: {
    marginHorizontal: 10,
    alignItems: 'center',
    width: 30,
  },

  flatList: {
    borderRadius: 6,
  },
});
