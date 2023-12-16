import React, {useEffect, useState} from 'react';
import {useWindowDimensions} from 'react-native';

const useCheckLargeScreen = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const {width} = useWindowDimensions();

  const checkWidthScreen = () => {
    if (width > 400) {
      return setIsLargeScreen(true);
    }
    return setIsLargeScreen(false);
  };

  useEffect(() => {
    checkWidthScreen();
  }, []);

  return isLargeScreen;
};

export default useCheckLargeScreen;
