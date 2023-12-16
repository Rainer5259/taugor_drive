import {StyleSheet} from 'react-native';
import {colors} from '~/shared/themes/colors';

export const styles = (selectedFile?: string, elementID?: string) =>
  StyleSheet.create({
    content: {
      marginHorizontal: 4,
      width: 280,
      justifyContent: 'flex-start',
      alignItems: selectedFile === elementID ? 'flex-start' : 'center',
      paddingVertical: selectedFile === elementID ? 8 : 0,
      paddingLeft: 8,
      height: selectedFile === elementID ? 100 : 40,
      marginVertical: 10,
      borderWidth: 0.6,
      borderColor: !selectedFile
        ? colors.primaryGreen
        : selectedFile === elementID
        ? colors.primaryGreen
        : colors.primaryCharcoalOpaque,
      opacity: !selectedFile ? 1 : selectedFile === elementID ? 1 : 0.8,
      borderRadius: 16,
      flexDirection: 'row',
    },

    childrenContentAlignment: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    contentTextsBox: {
      paddingLeft: 8,
      height: selectedFile === elementID ? '100%' : 38,
      justifyContent: selectedFile === elementID ? 'space-between' : 'center',

      width: '80%',
    },

    contentTitleText: {
      fontWeight: '500',
      fontSize: 14,
      color: colors.primaryText,
    },

    contentExtensionText: {
      fontSize: 12,
      color: colors.primaryCharcoal,
    },

    contentSizeText: {
      fontSize: 14,
      color: colors.primaryCharcoal,
      fontWeight: '600',
    },

    dateText: {
      position: 'absolute',
      right: 12,
      bottom: 6,
      fontSize: 12,
      color: colors.primaryCharcoal,
    },

    titleText: {
      color: colors.primaryGreen,
      fontWeight: 'bold',
      fontSize: 18,
    },

    flatList: {
      backgroundColor: colors.secondaryBackgroundOpaque,
      width: 300,
      borderRadius: 12,
      paddingTop: 10,
    },

    contentContainerFlatList: {alignItems: 'center'},

    emptyListView: {
      shadowColor: colors.primaryShadow,
      shadowOpacity: 0.2,
      shadowOffset: {height: 0, width: 0},
      justifyContent: 'center',
      alignItems: 'center',
      width: 300,
      height: 450,
      backgroundColor: colors.secondaryCharcoal,
      borderRadius: 6,
    },

    chevronDownIcon: {
      position: 'absolute',
      right: 14,
      top: 14,
    },

    searchInput: {
      width: '100%',
      borderColor: colors.primaryGreen,
      borderWidth: 1,
      borderRadius: 24,
      paddingHorizontal: 20,
      height: 44,
      marginBottom: 10,
    },
  });
