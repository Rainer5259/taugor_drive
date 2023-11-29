import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';

import CloudUploadIcon from '~/assets/svgs/cloud-upload.svg';
import TextInputDefault from '../TextInputDefault';
import {t} from 'i18next';
import {UploadComponentProps} from './interface';
import ButtonDefault from '../ButtonDefault';
import UsedSpace from '~/components/UsedSpace';

const UploadComponent: FC<UploadComponentProps> = ({
  onPressChooseFile,
  onPressSeeMyFiles,
  size,
  title,
}) => {
  return (
    <View style={styles.container}>
      <UsedSpace totalSpaceAvailable={200} usedSpace={23} />

      <View style={styles.uploadContainer}>
        <Text style={styles.primaryText}>
          {t('COMPONENTS.UPLOAD.SIZE_OF_FILE', {size: size ? size : 0})}
        </Text>

        <CloudUploadIcon width={160} height={100} />

        <View style={styles.inputBox}>
          <TextInputDefault
            style={styles.input}
            placeholder={t('COMPONENTS.UPLOAD.PLACEHOLDER_INPUT')}
            value={title}
          />
        </View>

        <Text style={[styles.primaryText, styles.limitPerFileText]}>
          {t('COMPONENTS.UPLOAD.LIMIT_PER_FILE')}
        </Text>
      </View>

      <View style={styles.buttonBox}>
        <ButtonDefault
          onPress={onPressChooseFile}
          style={styles.chooseFileButton}
          textStyle={[styles.buttonText, styles.secondaryText]}
          title={t('COMPONENTS.UPLOAD.BUTTON.CHOOSE_FILE')}
          disabledAnimation
        />
        <ButtonDefault
          onPress={onPressSeeMyFiles}
          textStyle={styles.buttonText}
          style={styles.seeMyFilesButton}
          title={t('COMPONENTS.UPLOAD.BUTTON.SEE_MY_FILES')}
          disabledAnimation
        />
      </View>
    </View>
  );
};

export default UploadComponent;
