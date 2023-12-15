import React, {FC, useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {t} from 'i18next';
import {styles} from './styles';
import {UsedSpaceProps} from './interface';
import FirebaseServices from '~/services/firebase';
import {RootState} from '~/services/redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {setTotalBytesUsed} from '~/services/redux/slices/authenticateUser';
import {useUsedSpace} from '~/shared/hooks/useUsedSpace';

const UsedSpace: FC<UsedSpaceProps> = () => {
  const {user, uploading, totalBytesUsed} = useSelector(
    (state: RootState) => state.user,
  );

  const dispatch = useDispatch();

  const handleGetTotalBytesUsed = async () => {
    await FirebaseServices.storage.get
      .getMetadataByUserID(user!.id)
      .then(bytes => {
        if (bytes !== 0) {
          const gigabytes = bytes / (1024 * 1024 * 1024);
          return dispatch(setTotalBytesUsed(parseFloat(gigabytes.toFixed(2))));
        }

        dispatch(setTotalBytesUsed(0));
        return;
      });
  };

  useEffect(() => {
    if (user?.id) {
      try {
        handleGetTotalBytesUsed();
      } catch (e) {
        handleGetTotalBytesUsed();
      }
    }
    console.log(user?.id);
  }, [uploading === false, user?.id]);
  // const usedSpace = useUsedSpace();

  // useEffect(() => {
  //   dispatch(setTotalBytesUsed(usedSpace));
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.usedSpaceText}>
        {t('COMPONENTS.UPLOAD.USED_SPACE.TITLE')}
      </Text>
      <Text style={styles.usedText}>
        {totalBytesUsed !== null ? (
          t('COMPONENTS.UPLOAD.USED_SPACE.CURRENT', {
            gb: totalBytesUsed.toFixed(2),
          })
        ) : (
          <ActivityIndicator />
        )}
      </Text>
      <Text style={styles.totalAvailableText}>
        {t('COMPONENTS.UPLOAD.USED_SPACE.FROM_TOTAL_AVAILABLE', {
          totalAvailableGB: 2,
        })}
      </Text>
    </View>
  );
};

export default UsedSpace;
