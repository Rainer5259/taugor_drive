import {StyleSheet} from 'react-native';
import {colors} from '~/shared/themes/colors';

export const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: colors.primaryBackground,
    flex: 1,
  },

  container: {
    flex: 1,

    alignItems: 'center',
    paddingTop: 10,

    width: '100%',
  },

  FilesListBox: {
    height: 450,
    marginTop: 10,
    shadowColor: '#333333',
    shadowOpacity: 0.2,
    shadowOffset: {height: 0, width: 0},
  },

  FoldersListBox: {position: 'absolute', bottom: 40, width: '100%'},

  flatListContainer: {
    width: '100%',
  },
});