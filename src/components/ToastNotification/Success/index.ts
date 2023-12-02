import React from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ToastNotificationProps} from '../interface';

const toastSuccess = ({
  text1,
  text2,
  visibilityTime,
  autoHide,
}: ToastNotificationProps) => {
  return Toast.show({
    type: 'success',
    text1,
    text2,
    visibilityTime,
    autoHide,
  });
};

export default toastSuccess;
