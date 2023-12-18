import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {t} from 'i18next';
import toastError from '~/components/ToastNotification/Error';
import toastSuccess from '~/components/ToastNotification/Success';
import {AuthErrorCodesCustom} from '~/shared/utils/types/AuthError';

const handleResetPasswordErrors = (
  e: FirebaseAuthTypes.NativeFirebaseAuthError,
) => {
  switch (e.code) {
    case AuthErrorCodesCustom.TOO_MANY_ATTEMPTS_TRY_LATER:
      toastSuccess({
        text1: t('SCREENS.AUTHENTICATION.ERRORS.TOO_MANY_ATTEMPTS_TRY_LATER'),
        text2: t('SCREENS.AUTHENTICATION.ERRORS.TRY_AGAIN_LATER'),
      });
      break;

    case AuthErrorCodesCustom.INVALID_EMAIL:
      toastError({
        text1: t('SCREENS.AUTHENTICATION.ERRORS.INVALID_EMAIL'),
      });
      break;

    case AuthErrorCodesCustom.NETWORK_REQUEST_FAILED:
      toastError({
        text1: t('GENERICS.CHECK_YOUR_CONNECTION'),
      });
      break;

    case AuthErrorCodesCustom.TIMEOUT:
      toastError({
        text1: t('GENERICS.REQUEST_FAILED'),
        text2: t('GENERICS.TRY_AGAIN'),
      });
      break;

    case AuthErrorCodesCustom.USER_NOT_FOUND:
      toastError({
        text1: t('SCREENS.AUTHENTICATION.ERRORS.USER_NOT_FOUND'),
      });
      break;

    default:
      toastError({text1: t('SCREENS.AUTHENTICATION.ERRORS.SEND_LINK')});
      break;
  }
};

export {handleResetPasswordErrors};
