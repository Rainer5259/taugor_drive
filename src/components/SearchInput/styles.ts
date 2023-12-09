import {StyleSheet} from 'react-native';
import {colors} from '~/shared/themes/colors';

export const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 40,
    borderWidth: 0.3,
    borderColor: colors.primaryGreen,
    borderRadius: 24,
    alignItems: 'flex-start',
    textAlign: 'left',
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: colors.secondaryText,
  },
});
