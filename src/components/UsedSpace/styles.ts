import {StyleSheet} from 'react-native';
import {colors} from '~/shared/themes/colors';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 80,
    justifyContent: 'space-between',
  },
  usedSpaceText: {
    fontSize: 14,
    fontWeight: '300',
    color: colors.primaryCharcoal,
  },
  usedText: {fontSize: 22, fontWeight: '700', color: colors.primaryGreen},
  totalAvailableText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primaryCharcoal,
  },
});
