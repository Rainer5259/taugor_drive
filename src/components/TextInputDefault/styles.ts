import {StyleSheet} from 'react-native';
import {colors} from '~/shared/themes/colors';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.primaryGreen,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: '100%',
    height: 40,
    borderRadius: 12,
  },
});
