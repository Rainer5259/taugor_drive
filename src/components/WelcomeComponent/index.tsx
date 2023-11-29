import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {Text, View, Animated} from 'react-native';
// import Animated, {
//   Easing,
//   SharedValue,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';

import TaugorDriveLogo from '~/assets/svgs/taugor-drive-with-name-logo.svg';
import {colors} from '~/shared/themes/colors';
import ButtonDefault from '../ButtonDefault';
import {AppScreens} from '~/routes/AppScreens';
import {LOCAL_STORAGE_SECRET_KEY} from '@env';
import SInfo from 'react-native-sensitive-info';
import {setToken} from '~/services/redux/slices/authenticateUser';
import {useDispatch} from 'react-redux';
import {useTypedNavigation} from '~/routes/useTypedNavigation';
import {styles} from './styles';
import {t} from 'i18next';
import {WelcomeComponentProps} from './interface';

const WelcomeComponent: FC<WelcomeComponentProps> = ({onPress}) => {
  const dispatch = useDispatch();
  const navigation = useTypedNavigation();

  const textOne = useRef(new Animated.Value(-300)).current;
  const textTwo = useRef(new Animated.Value(-200)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const opacityText = useRef(new Animated.Value(0)).current;
  const opacityButton = useRef(new Animated.Value(0)).current;

  const TextAnimated = Animated.createAnimatedComponent(Text);
  const ViewAnimated = Animated.createAnimatedComponent(View);

  const animateWithTimingStart = (
    toValue: number,
    animatedValue: Animated.Value,
    duration?: number,
    callback?: () => void,
  ) => {
    Animated.timing(animatedValue, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start(() => {
      if (callback) {
        return callback();
      }
    });
  };

  useEffect(() => {
    animateWithTimingStart(1, opacityText, 3000);
    animateWithTimingStart(60, textOne, 800);
    animateWithTimingStart(200, textTwo, 1300);
    animateWithTimingStart(1, opacity, 2000, () => {
      animateWithTimingStart(1, opacityButton, 200);
    });

    return () => {
      animateWithTimingStart(0, textOne);
      animateWithTimingStart(0, textTwo);
    };
  }, []);

  return (
    <View>
      <TextAnimated
        style={[
          styles.primaryTitle,
          {transform: [{translateX: textOne}], opacity: opacityText},
        ]}>
        {t('COMPONENTS.WELCOME.TITLE_ONE')}
      </TextAnimated>

      <TextAnimated
        style={[
          styles.secondTitle,
          {transform: [{translateX: textTwo}], opacity: opacityText},
        ]}>
        {t('COMPONENTS.WELCOME.TITLE_TWO')}
      </TextAnimated>

      <ViewAnimated style={[styles.logo, {opacity}]}>
        <TaugorDriveLogo width={189} height={186} />
      </ViewAnimated>

      <ViewAnimated style={[{opacity: opacityButton}]}>
        <ButtonDefault
          onPress={onPress}
          title={t('COMPONENTS.WELCOME.BUTTON')}
          textStyle={styles.goToUploadTextButton}
        />
      </ViewAnimated>
    </View>
  );
};

export default WelcomeComponent;
