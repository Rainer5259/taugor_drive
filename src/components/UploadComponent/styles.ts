import {StyleSheet} from 'react-native';
import {colors} from '~/shared/themes/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryBackground,
    alignItems: 'center',
  },

  uploadContainer: {
    marginTop: 30,
    paddingTop: 30,
    width: 320,
    height: 240,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: colors.secondaryCharcoal,
    justifyContent: 'space-evenly',
    borderColor: colors.primaryGreen,
    borderWidth: 0.3,
  },

  primaryText: {
    fontWeight: '500',
    fontSize: 12,
    color: colors.secondaryText,
    // fontFamily: 'Roboto-Bold',
  },

  limitPerFileText: {
    fontWeight: '300',
  },

  secondaryText: {
    color: colors.primaryGreen,
  },

  inputBox: {
    paddingHorizontal: 20,
  },

  input: {
    backgroundColor: colors.primaryBackground,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'flex-start',
    color: colors.primarySlateBlue,
    borderWidth: 0.6,
    borderColor: colors.primaryGreen,
  },

  buttonBox: {
    height: 90,
    marginTop: 40,
    justifyContent: 'space-between',
  },

  chooseFileButton: {
    backgroundColor: 'transparent',
    borderWidth: 0.8,
    borderColor: colors.primaryGreen,
    width: 320,
  },

  chooseFileTextButton: {
    color: colors.primaryGreen,
  },

  seeMyFilesButton: {
    width: 320,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primaryWhite,
  },
});
