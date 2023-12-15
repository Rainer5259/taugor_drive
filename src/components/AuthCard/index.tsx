import React, {FC, useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {styles} from './styles';
import Logo from '~/assets/svgs/taugor-drive-with-name-logo.svg';
import GoogleIcon from '~/assets/svgs/google-icon.svg';
import ButtonDefault from '../ButtonDefault';
import TextInputDefault from '../TextInputDefault';
import {AuthCardProps} from './interface';
import {t} from 'i18next';

const AuthCard: FC<AuthCardProps> = ({
  email,
  onPressSignIn,
  onPressSignUp,
  loadingForgotPassword,
  onPressForgotPassword,
  setLoadingForgotPassword,
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

  const handleOnPressForgotPassword = () => {
    onPressForgotPassword();
  };

  useEffect(() => {
    if (loadingForgotPassword) {
      setTimer(25);
    }
  }, [loadingForgotPassword]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else {
      setLoadingForgotPassword(false);
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
          placeholder={t('GENERICS.EMAIL')}
          keyboardType="email-address"
          value={email}
          onChangeText={e => setEmail(e)}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!disabled}
        />
        <TextInputDefault
          placeholder={t('GENERICS.PASSWORD')}
          keyboardType="default"
          secureTextEntry
          value={password}
          onChangeText={e => setPassword(e)}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!disabled}
        />

        <View style={styles.forgottenPasswordContainer}>
          {timer > 0 && (
            <View style={{marginRight: 10}}>
              <Text>{timer}s</Text>
            </View>
          )}

          {loadingForgotPassword && <ActivityIndicator />}
          <ButtonDefault
            onPress={handleOnPressForgotPassword}
            disabled={disabled || !timerIsZero}
            style={[
              styles.forgottenPasswordButton,
              {opacity: !timerIsZero ? 0.5 : 1},
            ]}>
            <Text style={styles.forgottenPasswordText}>
              {t('COMPONENTS.AUTH_CARD.FORGOT_PASSWORD')}
            </Text>
          </ButtonDefault>
        </View>
        <View style={styles.buttonBox}>
          <ButtonDefault
            title={t('COMPONENTS.AUTH_CARD.SIGN_IN')}
            textStyle={styles.primaryText}
            onPress={onPressSignIn}
            loading={loadingSignIn}
            disabled={disabled}
          />
          <ButtonDefault
            title={t('COMPONENTS.AUTH_CARD.SIGN_UP')}
            textStyle={styles.signUpTextButton}
            onPress={onPressSignUp}
            style={styles.signUpButton}
            loading={loadingSignUp}
            disabled={disabled}
          />
        </View>
      </View>

      <View style={styles.socialMediaContent}>
        <View style={styles.horizontalLine} />
        <Text style={styles.secondaryText}>
          {t('COMPONENTS.AUTH_CARD.OR_CONTINUE_WITH')}
        </Text>
        <ButtonDefault
          onPress={onPressSocialMedia}
          style={styles.socialMediaIconButton}
          loading={loadingSocialMedia}
          disabled={disabled}
          disabledAnimation>
          <GoogleIcon width={24} height={24} />
        </ButtonDefault>
      </View>
    </View>
  );
};

export default AuthCard;
