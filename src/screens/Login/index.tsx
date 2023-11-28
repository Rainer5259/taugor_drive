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
import {useDispatch} from 'react-redux';
import {setToken, setUser} from '~/services/redux/slices/authenticateUser';
import SInfo from 'react-native-sensitive-info';
import {LOCAL_STORAGE_SECRET_KEY} from '@env';
import {UserProps} from '~/services/redux/slices/interface';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('oo@email.com');
  const [password, setPassword] = useState<string>('123123');
  const [loadingSignIn, setLoadingSignIn] = useState<boolean>(false);
  const [loadingSignUp, setLoadingSignUp] = useState<boolean>(false);
  const [loadingSocialMedia, setLoadingSocialMedia] = useState<boolean>(false);
  const [loadingForgotPassword, setLoadingForgotPassword] =
    useState<boolean>(false);

  const dispatch = useDispatch();

  const checkEmptyFields = () => {
    if (!email || !password) {
      return Toast.show({
        type: 'error',
        text1: 'Fill all fields',
      });
    }
  };

  const handleSignIn = async () => {
    checkEmptyFields();

    setLoadingSignIn(true);
    try {
      const userInfo =
        await FirebaseServices.authentication.get.signUpWithEmailAndPassword(
          email,
          password,
        );

      if (userInfo) {
        toastSuccess({text1: t('GENERICS.WELCOME')});
        dispatch(setToken(userInfo.refreshToken));
        return;
      }
    } catch (e) {
      const error = e as FirebaseError;

      switch (error.code) {
        case AuthErrorCodesCustom.INVALID_CREDENTIALS:
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

        default:
          toastError({text1: t('ERRORS.HAS_OCURRED')});
          break;
      }
    } finally {
      setLoadingSignIn(false);
    }
  };

  const handleSignUp = async () => {
    checkEmptyFields();

    setLoadingSignUp(true);
    try {
      const userInfo =
        await FirebaseServices.authentication.post.signUpWithEmailAndPassword(
          email,
          password,
        );

      if (userInfo) {
        toastSuccess({text1: t('GENERICS.WELCOME')});
        dispatch(setToken(userInfo.refreshToken));
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

        default:
          toastError({text1: t('ERRORS.HAS_OCURRED')});
          break;
      }
    } finally {
      setLoadingSignUp(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      setLoadingSocialMedia(true);
      const userInfo =
        FirebaseServices.authentication.post.signInWithGooglePopup();

      const userData: UserProps = {
        id: (await userInfo).id,
        token: (await userInfo).token,
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

  const getStoragedToken = async () => {
    const storagedToken = await SInfo.getItem(LOCAL_STORAGE_SECRET_KEY, {});
    dispatch(setToken(storagedToken));
  };

  const handleResetPassword = async () => {
    checkEmptyFields();
    setLoadingForgotPassword(true);
    try {
      await FirebaseServices.authentication.get
        .requestPasswordResetEmail(email)
        .then(() => {
          toastSuccess({text1: 'Verifique sua caixa de entrada ou spam'});
        })
        .catch(e => {
          const error = e as FirebaseError;
          switch (error.code) {
            case AuthErrorCodesCustom.TOO_MANY_ATTEMPTS_TRY_LATER:
              toastSuccess({
                text1: 'Limite de solicitações excedido!',
                text2: 'tente novamente mais tarde.',
              });
              break;
            default:
              break;
          }
        });
    } catch (e) {
      toastError({text1: 'Erro ao enviar link'});
    } finally {
      setLoadingForgotPassword(false);
    }
  };

  useEffect(() => {
    getStoragedToken();
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
