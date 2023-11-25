import React, {FC} from 'react';
import {Text, View} from 'react-native';
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
  onPressForgotPassword,
  password,
  setEmail,
  setPassword,
}) => {
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

        <ButtonDefault
          onPress={onPressForgotPassword}
          style={styles.forgottenPasswordButton}>
          <Text style={styles.forgottenPasswordText}>Forgotten Password</Text>
        </ButtonDefault>

        <View style={styles.buttonBox}>
          <ButtonDefault
            title="Sign In"
            textStyle={styles.primaryText}
            onPress={onPressSignIn}
          />
          <ButtonDefault
            title="Sign Up"
            textStyle={styles.primaryText}
            onPress={onPressSignUp}
          />
        </View>
      </View>

      <View style={styles.socialMediaContent}>
        <Text style={styles.secondaryText}>Or continue with</Text>
        <ButtonDefault style={styles.socialMediaIconButton}>
          <GoogleIcon width={24} height={24} />
        </ButtonDefault>
      </View>
    </View>
  );
};

export default AuthCard;
