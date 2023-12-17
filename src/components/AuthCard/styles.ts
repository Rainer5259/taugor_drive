import {StyleSheet} from 'react-native';
import {colors} from '~/shared/themes/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  formBox: {marginTop: 20, height: 240, justifyContent: 'space-between'},

  socialMediaContent: {
    marginTop: 20,
    alignItems: 'center',
    height: 80,
    width: '100%',
    justifyContent: 'space-evenly',
  },

  socialMediaIconButton: {
    borderWidth: 1,
    borderColor: colors.primarySlateBlueOpaque,
    backgroundColor: 'transparent',
    width: 42,
    height: 42,
    borderRadius: 6,
  },
  horizontalLine: {
    borderWidth: 0.6,
    borderColor: colors.secondarySlateBlueOpaque,
    width: '100%',
    position: 'absolute',
    top: 16,
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
    maxWidth: 80,
  },

  secondaryText: {
    fontSize: 14,
    fontWeight: '300',
    color: colors.primarySlateBlueOpaque,
    backgroundColor: colors.primaryBackground,
    paddingHorizontal: 10,
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
    maxWidth: 142,
    alignSelf: 'flex-end',
  },

  forgottenPasswordText: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.brightBlue,
  },
});
