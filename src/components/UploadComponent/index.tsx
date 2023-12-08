import React, {FC, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';

import CloudUploadIcon from '~/assets/svgs/cloud-upload.svg';
import TextInputDefault from '../TextInputDefault';
import {t} from 'i18next';
import {UploadComponentProps} from './interface';
import ButtonDefault from '../ButtonDefault';
import UsedSpace from '~/components/UsedSpace';
import {colors} from '~/shared/themes/colors';

type sizeReferenceType = 'B' | 'Bytes' | 'KB' | 'MB' | 'GB';

const UploadComponent: FC<UploadComponentProps> = ({
  onPressChooseFile,
  onPressSeeMyFiles,
  size,
  title,
  setTitle,
  hasDocumentPicked,
  onPressRemoveDocumentPicked,
}) => {
  const [sizeCodeName, setSizeCodeName] = useState<sizeReferenceType>('B');
  const [convertedSize, setConvertedSize] = useState<number>(0);

  useEffect(() => {
    function formatBits(a: number, b = 2) {
      if (!+a) {
        setSizeCodeName('B');
        return 0;
      }

      const c = b < 0 ? 0 : b;
      const d = Math.floor(Math.log(a) / Math.log(1024));

      if (d === 0) {
        setSizeCodeName('B');
      } else if (d === 1) {
        setSizeCodeName('Bytes');
      } else if (d === -1) {
        setSizeCodeName('MB');
      } else if (d === -2) {
        setSizeCodeName('KB');
      }

      return parseFloat((a / Math.pow(1024, d)).toFixed(c));
    }

    const convertedBits = formatBits(size);
    setConvertedSize(convertedBits);
  }, [size]);

  return (
    <View style={styles.container}>
      <UsedSpace totalSpaceAvailable={200} usedSpace={23} />

      <View style={styles.uploadContainer}>
        <Text style={styles.primaryText}>
          {t('COMPONENTS.UPLOAD.SIZE_OF_FILE', {
            size: convertedSize ? convertedSize : 0,
            sizeReference: sizeCodeName,
          })}
        </Text>

        <CloudUploadIcon width={160} height={100} />

        <View style={styles.inputBox}>
          <TextInputDefault
            style={[styles.input, {opacity: hasDocumentPicked ? 1 : 0.5}]}
            placeholder={t('COMPONENTS.UPLOAD.PLACEHOLDER_INPUT')}
            value={title}
            onChange={e => setTitle(e.nativeEvent.text)}
            editable={hasDocumentPicked}
          />
        </View>

        <Text style={[styles.primaryText, styles.limitPerFileText]}>
          {t('COMPONENTS.UPLOAD.LIMIT_PER_FILE')}
        </Text>
      </View>

      <View style={styles.buttonBox}>
        <ButtonDefault
          onPress={onPressChooseFile}
          style={[
            styles.chooseFileButton,
            hasDocumentPicked && {
              backgroundColor: colors.primaryGreen,
            },
          ]}
          textStyle={[
            styles.buttonText,
            styles.secondaryText,
            hasDocumentPicked && {color: colors.primaryWhite},
          ]}
          title={
            hasDocumentPicked
              ? t('COMPONENTS.UPLOAD.BUTTON.UPLOAD')
              : t('COMPONENTS.UPLOAD.BUTTON.CHOOSE_FILE')
          }
          disabledAnimation
        />

        {hasDocumentPicked && (
          <ButtonDefault
            onPress={onPressRemoveDocumentPicked}
            style={styles.chooseFileButton}
            textStyle={[styles.buttonText, styles.secondaryText]}
            title={t('COMPONENTS.UPLOAD.BUTTON.REMOVE_FILE_PICKED')}
            disabledAnimation
          />
        )}
      </View>
      {/* <View style={{position: 'absolute', bottom: -100}}>
        <ButtonDefault
          onPress={onPressSeeMyFiles}
          textStyle={styles.buttonText}
          style={styles.seeMyFilesButton}
          title={t('COMPONENTS.UPLOAD.BUTTON.SEE_MY_FILES')}
          disabledAnimation
        />
      </View> */}
    </View>
  );
};

export default UploadComponent;
