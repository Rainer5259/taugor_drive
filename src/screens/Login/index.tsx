import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from './styles';
import AuthCard from '~/components/AuthCard';
import {FirebaseError} from 'firebase/app';
import FirebaseServices from '~/services/firebase';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {AuthErrorCodesCustom} from '~/shared/utils/types/AuthError';
import toastError from '~/components/ToastNotification/Error';
import {t} from 'i18next';
import toastSuccess from '~/components/ToastNotification/Success';
import {useDispatch, useSelector} from 'react-redux';
import {setToken, setUser} from '~/services/redux/slices/authenticateUser';
import SInfo from 'react-native-sensitive-info';
import {LOCAL_STORAGE_SECRET_KEY} from '@env';
import {regexEmail} from '~/shared/utils/regex/email';
import {AppUserCredentialInterface} from '~/shared/utils/types/user';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
const authModuleTypes: FirebaseAuthTypes.NativeFirebaseAuthError =
  {} as FirebaseAuthTypes.NativeFirebaseAuthError;
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('oo@email.com');
  const [password, setPassword] = useState<string>('123123');
  const [loadingSignIn, setLoadingSignIn] = useState<boolean>(false);
  const [loadingSignUp, setLoadingSignUp] = useState<boolean>(false);
  const [loadingSocialMedia, setLoadingSocialMedia] = useState<boolean>(false);
  const [loadingForgotPassword, setLoadingForgotPassword] =
    useState<boolean>(false);

  const dispatch = useDispatch();
  const emptyFields = !email || !password;

  const fillAllFieldsToast = () => {
    return Toast.show({
      type: 'error',
      text1: t('SCREENS.AUTHENTICATION.ERRORS.FILL_FIELDS'),
    });
  };

  const handleSignIn = async () => {
    if (emptyFields) {
      return fillAllFieldsToast();
    }

    setLoadingSignIn(true);
    try {
      const userInfo =
        await FirebaseServices.authentication.get.signInWithEmail(
          email,
          password,
        );

      if (userInfo) {
        console.log('userInfo', userInfo);
        dispatch(setToken(userInfo.token));
        return;
      }
    } catch (e) {
      const error = e as FirebaseAuthTypes.NativeFirebaseAuthError;
      console.log('erro userInfo', e);

      switch (error.code) {
        case '':
          toastError({
            text1: t('SCREENS.AUTHENTICATION.ERRORS.INVALID_CREDENTIALS'),
          });
          break;
        case AuthErrorCodesCustom.TOO_MANY_ATTEMPTS_TRY_LATER:
          toastError({
            text1: t(
              'SCREENS.AUTHENTICATION.ERRORS.TOO_MANY_ATTEMPTS_TRY_LATER',
            ),
          });
          break;

        case AuthErrorCodesCustom.INVALID_EMAIL:
          toastError({
            text1: t('SCREENS.AUTHENTICATION.ERRORS.INVALID_EMAIL'),
          });
          break;

        case AuthErrorCodesCustom.NETWORK_REQUEST_FAILED:
          toastError({
            text1: 'Net caiu',
          });
          break;

        default:
          toastError({text1: t('ERRORS.HAS_OCURRED')});
          break;
      }
    } finally {
      setLoadingSignIn(false);
    }
  };

  const handleSignUp = async () => {
    if (emptyFields) {
      return fillAllFieldsToast();
    }

    if (!regexEmail.test(email)) {
      return toastError({
        text1: t('COMPONENTS.AUTH_CARD.ERRORS.INVALID_EMAIL'),
      });
    }

    setLoadingSignUp(true);
    try {
      const userInfo =
        await FirebaseServices.authentication.post.signUpWithEmail(
          email,
          password,
        );

      if (userInfo) {
        dispatch(setToken(userInfo.refreshToken));
        dispatch(setUser({id: userInfo.uid}));
        toastSuccess({
          text1: t('SCREENS.AUTHENTICATION.SUCCESS.USER_REGISTERED'),
        });

        return;
      }
    } catch (e) {
      const error = e as FirebaseError;

      switch (error.code) {
        case AuthErrorCodesCustom.EMAIL_EXISTS:
          toastError({text1: t('SCREENS.AUTHENTICATION.ERRORS.USER_EXIST')});
          setEmail('');
          break;

        case AuthErrorCodesCustom.INVALID_EMAIL:
          toastError({text1: t('SCREENS.AUTHENTICATION.ERRORS.INVALID_EMAIL')});
          break;

        case AuthErrorCodesCustom.NETWORK_REQUEST_FAILED:
          toastError({
            text1: 'Net caiu',
          });
          break;
        default:
          toastError({text1: t('ERRORS.HAS_OCURRED')});
          break;
      }
    } finally {
      setLoadingSignUp(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    setLoadingSocialMedia(true);
    try {
      const userInfo =
        await FirebaseServices.authentication.post.signInWithGoogle();

      const userData: AppUserCredentialInterface = {
        id: userInfo.id,
        token: userInfo.token,
      };

      dispatch(setUser(userData));
      dispatch(setToken(userData.token));
      setEmail('');
      setPassword('');
    } catch (e) {
    } finally {
      setLoadingSocialMedia(false);
    }
  };

  const fetchUserInfoStoraged = async () => {
    try {
      const storagedUser = await SInfo.getItem(LOCAL_STORAGE_SECRET_KEY, {});

      if (storagedUser) {
        const userParsed: AppUserCredentialInterface = JSON.parse(storagedUser);
        dispatch(setToken(userParsed.token));
        dispatch(setUser({id: userParsed.id}));
      }
    } catch (e) {}
  };

  const handleResetPassword = async () => {
    if (!email) {
      return fillAllFieldsToast();
    }

    setLoadingForgotPassword(true);
    try {
      await FirebaseServices.authentication.get.resetPasswordWithEmail(email);
      toastSuccess({
        text1: t('SCREENS.AUTHENTICATION.SUCCESS.CHECK_EMAIL_BOX'),
      });
    } catch (e) {
      const error = e as FirebaseError;

      switch (error.code) {
        case AuthErrorCodesCustom.TOO_MANY_ATTEMPTS_TRY_LATER:
          toastSuccess({
            text1: t(
              'SCREENS.AUTHENTICATION.ERRORS.TOO_MANY_ATTEMPTS_TRY_LATER',
            ),
            text2: t('SCREENS.AUTHENTICATION.ERRORS.TRY_AGAIN_LATER'),
          });
          break;
        case AuthErrorCodesCustom.INVALID_EMAIL:
          toastError({
            text1: t('SCREENS.AUTHENTICATION.ERRORS.INVALID_EMAIL'),
          });
          break;
        default:
          toastError({text1: t('SCREENS.AUTHENTICATION.ERRORS.SEND_LINK')});
          break;
      }
    } finally {
      setLoadingForgotPassword(false);
    }
  };

  useEffect(() => {
    fetchUserInfoStoraged();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -300}
          style={styles.keyboardAvoidingView}>
          <AuthCard
            email={email}
            setEmail={setEmail}
            onPressForgotPassword={handleResetPassword}
            onPressSignIn={handleSignIn}
            onPressSignUp={handleSignUp}
            setLoadingForgotPassword={setLoadingForgotPassword}
            password={password}
            setPassword={setPassword}
            loadingSignIn={loadingSignIn}
            loadingSignUp={loadingSignUp}
            loadingForgotPassword={loadingForgotPassword}
            loadingSocialMedia={loadingSocialMedia}
            onPressSocialMedia={handleLoginWithGoogle}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Login;
