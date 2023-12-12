import {StyleSheet} from 'react-native';
import {colors} from '~/shared/themes/colors';

export const styles = (selectedFolderID?: string, elementID?: string) =>
  StyleSheet.create({
    content: {
      marginHorizontal: 4,
      width: 110,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      height: 90,
      marginVertical: 10,
      borderRadius: 6,
    },

    textContent: {
      fontSize: 12,
      paddingHorizontal: 4,
      color: colors.secondaryTextOpaque,
    },

    titleText: {
      paddingLeft: 10,
      color: colors.primaryGreen,
      fontWeight: 'bold',
      fontSize: 18,
    },

    flatList: {
      backgroundColor: colors.secondaryBackgroundOpaque,
      height: 100,
      width: 300,
    },

    contentContainerFlatList: {alignItems: 'center'},

    emptyListView: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 300,
      height: 100,
      backgroundColor: colors.secondaryCharcoal,
      borderRadius: 6,
    },
  });
