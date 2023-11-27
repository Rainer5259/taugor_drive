import {StyleSheet} from 'react-native';
import {colors} from '~/shared/themes/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  formBox: {marginTop: 20, height: 240, justifyContent: 'space-between'},

  socialMediaContent: {
    marginTop: 20,
    alignItems: 'center',
    height: 80,
    width: 280,
    justifyContent: 'space-between',
  },

  socialMediaIconButton: {
    backgroundColor: '#33333310',
  },

  buttonBox: {
    marginTop: 10,
    height: 90,
    justifyContent: 'space-between',
  },

  primaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primaryWhite,
  },

  signUpTextButton: {
    color: colors.primaryGreen,
    fontSize: 16,
    fontWeight: 'bold',
  },

  signUpButton: {
    backgroundColor: 'transparent',
  },

  secondaryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primarySlateBlue,
  },

  forgottenPasswordContainer: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    width: 160,
    height: 40,
  },

  forgottenPasswordButton: {
    backgroundColor: 'transparent',
    width: 140,
    alignSelf: 'flex-end',
  },

  forgottenPasswordText: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.brightBlue,
  },
});
