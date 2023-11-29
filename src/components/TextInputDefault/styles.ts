import {StyleSheet} from 'react-native';
import {colors} from '~/shared/themes/colors';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 0.6,
    borderColor: colors.primarySlateBlueOpaque,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: '100%',
    height: 40,
    borderRadius: 12,
    color: colors.primarySlateBlue,
  },
});
