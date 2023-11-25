import React, {useState} from 'react';
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

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('oo@email.com');
  const [password, setPassword] = useState<string>('123123');

  const handleSignIn = async () => {
    if (!email || !password) {
      return console.log('fill field');
      // toast.error(t('SCREENS.AUTHENTICATION.ERRORS.FILL_FIELDS'));
    }

    try {
      const user =
        await FirebaseServices.authentication.get.signUpWithEmailAndPassword(
          email,
          password,
        );

      if (user) {
        return;
      }
    } catch (e) {
      const error = e as FirebaseError;
      console.log('error signUP', error);
      // switch (error.code) {
      //   case AuthErrorCodesCustom.INVALID_CREDENTIALS:
      //     toast.error(t('SCREENS.AUTHENTICATION.ERRORS.INVALID_CREDENTIALS'));
      //     break;
      //   case AuthErrorCodesCustom.TOO_MANY_ATTEMPTS_TRY_LATER:
      //     toast.error(
      //       t('SCREENS.AUTHENTICATION.ERRORS.TOO_MANY_ATTEMPTS_TRY_LATER'),
      //     );
      //     break;

      //   default:
      //     toast.error(t('ERRORS.HAS_OCURRED'));
      //     break;
      // }
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      return;
    }
    console.log('sign up');
    try {
      const user =
        await FirebaseServices.authentication.post.signUpWithEmailAndPassword(
          email,
          password,
        );
      console.log('signup caiu no try');
      if (user) {
        setEmail('');
        setPassword('');
        console.log('signup caiu no if do try');
        // dispatch(setToken(await user.getIdToken()));
        // dispatch(setUser(user));

        // return toast.success(
        //   t('SCREENS.AUTHENTICATION.SUCCESS.USER_REGISTERED'),
        // );
      }
    } catch (e) {
      const error = e as FirebaseError;
      console.log('error signup', error);
      // switch (error.code) {
      //   case AuthErrorCodes.EMAIL_EXISTS:
      //     toast.error(t('SCREENS.AUTHENTICATION.ERRORS.USER_EXIST'));
      //     setEmail('');
      //     break;

      //   case AuthErrorCodes.INVALID_EMAIL:
      //     toast.error(t('SCREENS.AUTHENTICATION.ERRORS.INVALID_EMAIL'));
      //     break;

      //   default:
      //     toast.error(t('ERRORS.HAS_OCURRED'));
      //     break;
      // }
    } finally {
      // setLoading(false);
    }
  };
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
            onPressForgotPassword={() => {}}
            onPressSignIn={handleSignIn}
            onPressSignUp={handleSignUp}
            password={password}
            setPassword={setPassword}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Login;
