import {StyleSheet} from 'react-native';
import {colors} from '~/shared/themes/colors';

export const styles = (selectedFolderID?: string, elementID?: string) =>
  StyleSheet.create({
    content: {
      marginHorizontal: 4,
      width: 280,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 12,
      minHeight: 38,
      maxHeight: 82,
      marginVertical: 10,
      backgroundColor:
        selectedFolderID === elementID
          ? colors.primaryCharcoalOpaque
          : colors.primaryCharcoalOpaque,
      borderRadius: 16,
      flexDirection: 'row',
    },

    textContent: {
      paddingLeft: 10,
      fontSize: 12,
      paddingHorizontal: 4,
      color: colors.primaryWhite,
    },

    titleText: {
      color: colors.primaryGreen,
      fontWeight: 'bold',
      fontSize: 18,
    },

    flatList: {
      backgroundColor: colors.secondaryText + '50',
      width: 300,
      borderRadius: 6,
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

    chevronDownIcon: {position: 'absolute', right: 20},
  });
