import React, {FC, useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {t} from 'i18next';
import {styles} from './styles';
import {UsedSpaceProps} from './interface';
import FirebaseServices from '~/services/firebase';
import {RootState} from '~/services/redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {setTotalBytesUsed} from '~/services/redux/slices/authenticateUser';
import {SizeReferenceType} from '~/shared/utils/types/SizeReference';

const UsedSpace: FC<UsedSpaceProps> = () => {
  const {user, uploading, totalBytesUsed} = useSelector(
    (state: RootState) => state.user,
  );
  const [sizeCodeName, setSizeCodeName] = useState<SizeReferenceType>('B');
  const dispatch = useDispatch();

  const handleGetTotalBytesUsed = async () => {
    await FirebaseServices.storage.get
      .getMetadataByUserID(user!.id)
      .then(bytes => {
        if (bytes !== 0) {
          function formatBits(a: number, b = 2) {
            if (!+a) {
              setSizeCodeName('B');
              return 0;
            }

            const c = b < 0 ? 0 : b;
            const d = Math.floor(Math.log(a) / Math.log(1024));

            if (a < 1024) {
              setSizeCodeName('B');
            } else if (a >= 1024 && a < Math.pow(1024, 2)) {
              setSizeCodeName('KB');
            } else if (a >= Math.pow(1024, 2) && a < Math.pow(1024, 3)) {
              setSizeCodeName('MB');
            } else {
              setSizeCodeName('GB');
            }

            return parseFloat((a / Math.pow(1024, d)).toFixed(c));
          }

          const convertedBits = formatBits(bytes);
          console.log('converted', convertedBits, user?.id);

          return dispatch(setTotalBytesUsed(convertedBits));
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
  }, [uploading === false, user?.id]);

  return (
    <View style={styles.container}>
      <Text style={styles.usedSpaceText}>
        {t('COMPONENTS.UPLOAD.USED_SPACE.TITLE')}
      </Text>
      {totalBytesUsed !== null ? (
        <Text style={styles.usedText}>
          {totalBytesUsed.toFixed(0)}
          {sizeCodeName}
        </Text>
      ) : (
        <ActivityIndicator />
      )}
      <Text style={styles.totalAvailableText}>
        {t('COMPONENTS.UPLOAD.USED_SPACE.FROM_TOTAL_AVAILABLE', {
          totalAvailableGB: 2,
        })}
      </Text>
    </View>
  );
};

export default UsedSpace;
