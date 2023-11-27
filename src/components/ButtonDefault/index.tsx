import React, {FC, useEffect} from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {ButtonDefaultProps} from './interface';
import {styles} from './styles';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const ButtonDefault: FC<ButtonDefaultProps> = ({
  title,
  children,
  style,
  textStyle,
  loading,
  ...rest
}) => {
  const buttonWidth = useSharedValue(150);
  const opacity = useSharedValue(1);
  const {width} = useWindowDimensions();
  const widthButton = width - 40;

  const TouchableOpacityAnimated =
    Animated.createAnimatedComponent(TouchableOpacity);

  const animateButtonWidth = (toValue: number) => {
    buttonWidth.value = withTiming(toValue, {
      duration: 300,
      easing: Easing.ease,
    });
  };

  const animateOpacity = (toValue: number) => {
    opacity.value = withTiming(toValue, {
      duration: 300,
      easing: Easing.ease,
    });
  };

  useEffect(() => {
    if (loading) {
      animateButtonWidth(60);
      animateOpacity(0.5);
    } else {
      animateButtonWidth(widthButton);
      animateOpacity(1);
    }
  }, [loading]);

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      width: buttonWidth.value,
      opacity: opacity.value,
    };
  });

  return (
    <TouchableOpacityAnimated
      style={[styles.container, animatedButtonStyle, style]}
      {...rest}
      activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator color={styles.activityIndicator.color} />
      ) : (
        <>
          {title && <Text style={textStyle}>{title}</Text>}
          {children}
        </>
      )}
    </TouchableOpacityAnimated>
  );
};

export default ButtonDefault;
