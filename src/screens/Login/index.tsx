import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from './styles';
import AuthCard from '~/components/AuthCard';
import FirebaseServices from '~/services/firebase';
import toastError from '~/components/ToastNotification/Error';
import {t} from 'i18next';
import toastSuccess from '~/components/ToastNotification/Success';
import {useDispatch} from 'react-redux';
import {setToken, setUser} from '~/services/redux/slices/authenticateUser';
import {regexEmail} from '~/shared/utils/regex/email';
import {AppUserCredentialInterface} from '~/shared/utils/types/user';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {colors} from '~/shared/themes/colors';
import {
  fillAllFieldsToast,
  isInvalidEmailToast,
  isShortPasswordToast,
} from './fields_middleware';
import {
  handleResetPasswordErrors,
  handleSignInErrors,
  handleSignUpErrors,
} from './errors';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loadingSignIn, setLoadingSignIn] = useState<boolean>(false);
  const [loadingSignUp, setLoadingSignUp] = useState<boolean>(false);
  const [loadingSocialMedia, setLoadingSocialMedia] = useState<boolean>(false);
  const [loadingForgotPassword, setLoadingForgotPassword] =
    useState<boolean>(false);

  const dispatch = useDispatch();
  const emptyFields = !email || !password;
  const isValidPassword = password.length < 6;

  const handleSignIn = async () => {
    if (emptyFields) {
      fillAllFieldsToast();
      return;
    }

    if (!regexEmail.test(email)) {
      return isInvalidEmailToast();
    }

    if (isValidPassword) {
      return isShortPasswordToast();
    }

    setLoadingSignIn(true);

    try {
      await FirebaseServices.authentication.get
        .signInWithEmail(email, password)
        .then(userInfo => {
          if (userInfo) {
            dispatch(setToken(userInfo.token));
            setLoadingSignIn(false);
            return;
          }
        });
    } catch (e) {
      setLoadingSignIn(false);
      handleSignInErrors(e as FirebaseAuthTypes.NativeFirebaseAuthError);
    }
  };

  const handleSignUp = async () => {
    if (emptyFields) {
      return fillAllFieldsToast();
    }

    if (!regexEmail.test(email)) {
      return isInvalidEmailToast();
    }

    if (isValidPassword) {
      return isShortPasswordToast();
    }

    setLoadingSignUp(true);

    try {
      await FirebaseServices.authentication.post
        .signUpWithEmail(email, password)
        .then(userInfo => {
          if (userInfo) {
            dispatch(setToken(userInfo.token));
            dispatch(setUser({id: userInfo.id}));
            toastSuccess({
              text1: t('SCREENS.AUTHENTICATION.SUCCESS.USER_REGISTERED'),
            });
            return;
          }
        });
    } catch (e) {
      const error = e as FirebaseAuthTypes.NativeFirebaseAuthError;
      handleSignUpErrors(error, setEmail);
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
      setLoadingSocialMedia(false);
    } catch (e) {
      setLoadingSocialMedia(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      return toastError({text1: t('GENERICS.TYPE_YOUR_EMAIL')});
    }

    if (!regexEmail.test(email)) {
      return isInvalidEmailToast();
    }

    setLoadingForgotPassword(true);
    try {
      await FirebaseServices.authentication.get.resetPasswordWithEmail(email);
      toastSuccess({
        text1: t('SCREENS.AUTHENTICATION.SUCCESS.CHECK_EMAIL_BOX'),
      });
    } catch (e) {
      const error = e as FirebaseAuthTypes.NativeFirebaseAuthError;
      handleResetPasswordErrors(error);
    }
    setLoadingForgotPassword(false);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        animated
        barStyle="dark-content"
        backgroundColor={colors.primaryBackground}
      />
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : -300}
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
    </SafeAreaView>
  );
};

export default Login;
