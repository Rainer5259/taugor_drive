import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

const useKeyboardListener = () => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsFocused(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsFocused(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return isFocused;
};

export default useKeyboardListener;
