import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {t} from 'i18next';
import {Dispatch, SetStateAction} from 'react';
import toastError from '~/components/ToastNotification/Error';
import {AuthErrorCodesCustom} from '~/shared/utils/types/AuthError';

const handleSignUpErrors = (
  e: FirebaseAuthTypes.NativeFirebaseAuthError,
  setEmail: Dispatch<SetStateAction<string>>,
) => {
  switch (e.code) {
    case AuthErrorCodesCustom.EMAIL_EXISTS:
      toastError({text1: t('SCREENS.AUTHENTICATION.ERRORS.USER_EXIST')});
      setEmail('');
      break;

    case AuthErrorCodesCustom.INVALID_EMAIL:
      toastError({text1: t('SCREENS.AUTHENTICATION.ERRORS.INVALID_EMAIL')});
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

    default:
      toastError({text1: t('ERRORS.HAS_OCURRED')});
      break;
  }
};

export {handleSignUpErrors};
