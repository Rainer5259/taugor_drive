import {StyleSheet} from 'react-native';
import {colors} from '~/shared/themes/colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primaryBackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.3,
    borderColor: colors.primaryCharcoal,
    flexDirection: 'row',
  },
  left: {
    position: 'absolute',
    left: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryCharcoal,
  },
  logout: {
    position: 'absolute',
    right: 20,
  },
});
