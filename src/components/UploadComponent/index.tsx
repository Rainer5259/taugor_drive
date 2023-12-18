import React, {FC, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';

import CloudUploadIcon from '~/assets/svgs/cloud-upload.svg';
import TextInputDefault from '../TextInputDefault';
import {t} from 'i18next';
import {SizeReferenceType, UploadComponentProps} from './interface';
import ButtonDefault from '../ButtonDefault';
import UsedSpace from '~/components/UsedSpace';
import {colors} from '~/shared/themes/colors';
import {useSelector} from 'react-redux';
import {RootState} from '~/services/redux/store';
import useCheckLargeScreen from '~/shared/hooks/useLargeScreen';

const UploadComponent: FC<UploadComponentProps> = ({
  onPressChooseFile,
  size,
  title,
  setTitle,
  hasDocumentPicked,
  onPressRemoveDocumentPicked,
  pickingFile,
}) => {
  const [sizeCodeName, setSizeCodeName] = useState<SizeReferenceType>('B');
  const [convertedSize, setConvertedSize] = useState<number>(0);
  const {uploading} = useSelector((state: RootState) => state.user);

  const isLargeScreen = useCheckLargeScreen();

  useEffect(() => {
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

    const convertedBits = formatBits(size);
    setConvertedSize(convertedBits);
  }, [size]);

  return (
    <View style={styles.container}>
      <UsedSpace />

      <View style={[styles.uploadContainer, isLargeScreen && {height: 500}]}>
        <Text style={styles.primaryText}>
          {t('COMPONENTS.UPLOAD.SIZE_OF_FILE', {
            size: convertedSize ? convertedSize : 0,
            sizeReference: sizeCodeName,
          })}
        </Text>

        <CloudUploadIcon width={160} height={100} />

        <View style={styles.inputBox}>
          <TextInputDefault
            style={[
              styles.input,
              !hasDocumentPicked && {
                opacity: 0.5,
                backgroundColor: colors.secondaryCharcoalOpaque,
              },
            ]}
            placeholder={t('COMPONENTS.UPLOAD.PLACEHOLDER_INPUT')}
            value={title}
            onChange={e => setTitle(e.nativeEvent.text)}
            editable={hasDocumentPicked}
            maxLength={40}
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
            uploading && {opacity: 0.6},
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
          loading={pickingFile || uploading}
          disabledAnimation={pickingFile}
          disabled={uploading || pickingFile}
        />

        {hasDocumentPicked && (
          <ButtonDefault
            onPress={onPressRemoveDocumentPicked}
            style={[styles.chooseFileButton, uploading && {opacity: 0.6}]}
            textStyle={[styles.buttonText, styles.secondaryText]}
            title={t('COMPONENTS.UPLOAD.BUTTON.REMOVE_FILE_PICKED')}
            disabledAnimation
            disabled={uploading}
          />
        )}
      </View>
    </View>
  );
};

export default UploadComponent;
