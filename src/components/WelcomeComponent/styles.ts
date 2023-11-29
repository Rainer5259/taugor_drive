import {StyleSheet} from 'react-native';
import {colors} from '~/shared/themes/colors';

export const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    paddingBottom: 40,
  },
  primaryTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primaryCharcoal,
  },
  secondTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primaryGreen,
  },
  goToUploadTextButton: {
    textAlign: 'center',
    color: colors.primaryWhite,
    fontSize: 16,
    fontWeight: '800',
  },
});
