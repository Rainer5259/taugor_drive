import React, {FC, useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {styles} from './styles';
import Logo from '~/assets/svgs/taugor-drive-with-name-logo.svg';
import GoogleIcon from '~/assets/svgs/google-icon.svg';
import ButtonDefault from '../ButtonDefault';
import TextInputDefault from '../TextInputDefault';
import {AuthCardProps} from './interface';

const AuthCard: FC<AuthCardProps> = ({
  email,
  onPressSignIn,
  onPressSignUp,
  loadingForgotPassword,
  onPressForgotPassword,
  password,
  setEmail,
  setPassword,
  loadingSocialMedia,
  onPressSocialMedia,
  loadingSignIn,
  loadingSignUp,
}) => {
  const disabled = loadingSignIn || loadingSignUp || loadingSocialMedia;
  const [timer, setTimer] = useState<number>(0);

  const timerIsZero = timer === 0;

  console.log('fn', timer);

  const handleOnPressForgotPassword = () => {
    onPressForgotPassword();
    // setTimer(5);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer(prevSeconds => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);

  return (
    <View style={styles.container}>
      <Logo width={153} height={135} />

      <View style={styles.formBox}>
        <TextInputDefault
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={e => setEmail(e)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInputDefault
          placeholder="Password"
          keyboardType="default"
          secureTextEntry
          value={password}
          onChangeText={e => setPassword(e)}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={styles.forgottenPasswordContainer}>
          {timer > 0 && (
            <View style={{marginRight: 10}}>
              <Text>{timer}</Text>
            </View>
          )}

          {loadingForgotPassword && <ActivityIndicator />}
          <ButtonDefault
            onPress={handleOnPressForgotPassword}
            disabled={!timerIsZero}
            style={[
              styles.forgottenPasswordButton,
              {opacity: !timerIsZero ? 0.5 : 1},
            ]}>
            <Text style={styles.forgottenPasswordText}>Forgotten Password</Text>
          </ButtonDefault>
        </View>
        <View style={styles.buttonBox}>
          <ButtonDefault
            title="Sign In"
            textStyle={styles.primaryText}
            onPress={onPressSignIn}
            loading={loadingSignIn}
            disabled={disabled}
          />
          <ButtonDefault
            title="Sign Up"
            textStyle={styles.signUpTextButton}
            onPress={onPressSignUp}
            style={styles.signUpButton}
            loading={loadingSignUp}
            disabled={disabled}
          />
        </View>
      </View>

      <View style={styles.socialMediaContent}>
        <Text style={styles.secondaryText}>Or continue with</Text>
        <ButtonDefault
          onPress={onPressSocialMedia}
          style={styles.socialMediaIconButton}
          loading={loadingSocialMedia}
          disabled={disabled}>
          <GoogleIcon width={24} height={24} />
        </ButtonDefault>
      </View>
    </View>
  );
};

export default AuthCard;
