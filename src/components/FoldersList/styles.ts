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
      backgroundColor:
        selectedFolderID === elementID
          ? colors.primaryCharcoalOpaque
          : colors.secondaryCharcoal,
      borderRadius: 6,
    },

    textContent: {
      fontSize: 12,
      paddingHorizontal: 4,
      color: colors.primaryWhite,
    },

    flatList: {
      backgroundColor: colors.secondaryText + '50',
      marginHorizontal: 10,
      borderRadius: 6,
      height: 100,
    },

    contentContainerFlatList: {alignItems: 'center'},
  });
