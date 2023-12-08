import React, {FC, useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {t} from 'i18next';
import {styles} from './styles';
import {UsedSpaceProps} from './interface';
import FirebaseServices from '~/services/firebase';
import {RootState} from '~/services/redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {setTotalBytesUsed} from '~/services/redux/slices/authenticateUser';

const UsedSpace: FC<UsedSpaceProps> = () => {
  const {user, totalBytesUsed} = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const handleGetTotalBytesUsed = async () => {
    await FirebaseServices.storage.get
      .getMetadataByUserID(user!.id)
      .then(bytes => {
        const gigabytes = bytes / (1024 * 1024 * 1024);

        dispatch(setTotalBytesUsed(parseFloat(gigabytes.toFixed(2))));
      });
  };

  useEffect(() => {
    if (user?.id) {
      try {
        handleGetTotalBytesUsed();
      } catch (e) {
        // try fetch again
        handleGetTotalBytesUsed();
      }
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.usedSpaceText}>
        {t('COMPONENTS.UPLOAD.USED_SPACE.TITLE')}
      </Text>
      <Text style={styles.usedText}>
        {totalBytesUsed ? (
          t('COMPONENTS.UPLOAD.USED_SPACE.CURRENT', {gb: totalBytesUsed})
        ) : (
          <ActivityIndicator />
        )}
      </Text>
      <Text style={styles.totalAvailableText}>
        {t('COMPONENTS.UPLOAD.USED_SPACE.FROM_TOTAL_AVAILABLE', {
          totalAvailableGB: 15,
        })}
      </Text>
    </View>
  );
};

export default UsedSpace;
