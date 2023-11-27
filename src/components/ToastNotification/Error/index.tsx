import React from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ToastNotificationProps} from '../interface';

const toastError = ({text1, text2}: ToastNotificationProps) => {
  return Toast.show({
    type: 'error',
    text1,
    text2,
  });
};

export default toastError;
