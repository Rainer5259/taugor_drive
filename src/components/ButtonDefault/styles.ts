import {StyleSheet} from 'react-native';
import {colors} from '~/shared/themes/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderRadius: 12,
    alignSelf: 'center',
  },

  buttonOpacity: {opacity: 0.8},

  activityIndicator: {color: colors.primarySlateBlueOpaque},
});
