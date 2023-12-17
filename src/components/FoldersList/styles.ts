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
      backgroundColor:
        selectedFolderID === elementID
          ? colors.secondaryCharcoalOpaque
          : undefined,
    },

    textContent: {
      fontSize: 12,
      paddingHorizontal: 4,
      color: colors.secondaryTextOpaque,
    },

    titleText: {
      color: colors.primaryGreen,
      fontWeight: 'bold',
      fontSize: 18,
      paddingLeft: 10,
    },

    flatList: {
      height: 100,
      width: '100%',
    },

    contentContainerFlatList: {alignItems: 'center'},

    emptyListView: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 100,
      backgroundColor: colors.secondaryBackgroundOpaque,
      borderRadius: 6,
      shadowColor: colors.primaryShadow,
      shadowOpacity: 0.2,
      shadowOffset: {height: 0, width: 0},
    },

    emptyListViewContent: {
      justifyContent: 'center',
    },

    addButtonEmptyListView: {
      position: 'absolute',
      alignSelf: 'center',
      left: -50,
    },

    createFolderButton: {
      marginHorizontal: 10,
      alignItems: 'center',
      width: 30,
    },

    createFolderContainer: {
      backgroundColor: colors.secondaryBackgroundOpaque,
      height: 100,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },

    dialogContainerHeader: {alignItems: 'center'},

    dialogContainerFooter: {justifyContent: 'space-between'},
  });
