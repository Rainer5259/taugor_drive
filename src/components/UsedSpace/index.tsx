import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {t} from 'i18next';
import {styles} from './styles';
import {UsedSpaceProps} from './interface';

const UsedSpace: FC<UsedSpaceProps> = ({totalSpaceAvailable, usedSpace}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.usedSpaceText}>
        {t('COMPONENTS.UPLOAD.USED_SPACE.TITLE')}
      </Text>
      <Text style={styles.usedText}>
        {t('COMPONENTS.UPLOAD.USED_SPACE.CURRENT', {gb: usedSpace})}
      </Text>
      <Text style={styles.totalAvailableText}>
        {t('COMPONENTS.UPLOAD.USED_SPACE.FROM_TOTAL_AVAILABLE', {
          totalAvailableGB: totalSpaceAvailable,
        })}
      </Text>
    </View>
  );
};

export default UsedSpace;
