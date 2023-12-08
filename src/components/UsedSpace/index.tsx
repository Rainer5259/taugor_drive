import React, {FC, useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {t} from 'i18next';
import {styles} from './styles';
import {UsedSpaceProps} from './interface';
import FirebaseServices from '~/services/firebase';
import {RootState} from '~/services/redux/store';
import {useSelector} from 'react-redux';

const UsedSpace: FC<UsedSpaceProps> = () => {
  const {user} = useSelector((state: RootState) => state.user);
  const [usedSpace, setUsedSpace] = useState(0);

  const handleGetTotalBytesUsed = async () => {
    await FirebaseServices.storage.get
      .getMetadataByUserID(user!.id)
      .then(bytes => {
        const gigabytes = bytes / (1024 * 1024 * 1024);

        setUsedSpace(parseFloat(gigabytes.toFixed(2)));
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
        {usedSpace ? (
          t('COMPONENTS.UPLOAD.USED_SPACE.CURRENT', {gb: usedSpace})
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
