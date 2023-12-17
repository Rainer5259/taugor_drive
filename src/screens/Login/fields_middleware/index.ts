import {t} from 'i18next';
import Toast from 'react-native-toast-message';
import toastError from '~/components/ToastNotification/Error';

export const fillAllFieldsToast = () => {
  return Toast.show({
    type: 'error',
    text1: t('SCREENS.AUTHENTICATION.ERRORS.FILL_FIELDS'),
  });
};

export const isInvalidEmailToast = () => {
  return toastError({
    text1: t('COMPONENTS.AUTH_CARD.ERRORS.INVALID_EMAIL'),
  });
};

export const isShortPasswordToast = () => {
  return toastError({
    text1: t('COMPONENTS.AUTH_CARD.SHORT_PASSWORD.ONE'),
    text2: t('COMPONENTS.AUTH_CARD.SHORT_PASSWORD.TWO'),
  });
};
