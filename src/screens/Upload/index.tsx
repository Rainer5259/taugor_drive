import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from './styles';

import UploadComponent from '~/components/UploadComponent';
import Header from '~/components/Header';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import FirebaseServices from '~/services/firebase';
import {AppDocumentInterface} from '~/shared/utils/types/document';
import {useSelector} from 'react-redux';
import {RootState} from '~/services/redux/store';
import toastSuccess from '~/components/ToastNotification/Success';
import {t} from 'i18next';
import {readFile} from 'react-native-fs';

const UploadScreen: React.FC = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [extension, setExtension] = useState<string | null>();
  const [title, setTitle] = useState<string | null>(null);
  const [uri, setURI] = useState<string | null>(null);
  const [size, setSize] = useState<number | null>(0);
  const [originalNameFile, setOriginalNameFile] = useState<string | null>(null);
  const [documentURI, setDocumentURI] = useState<string | null>();
  const [documentData, setDocumentData] =
    useState<DocumentPickerResponse | null>();

  const {user} = useSelector((state: RootState) => state.user);

  const handlePickerDocument = async () => {
    if (documentData) {
      return handleUploadFile();
    }

    try {
      const document = await DocumentPicker.pick({
        type: DocumentPicker.types.allFiles,
      });

      if (document[0].size === 0) {
        return 0;
      }

      const bytesConvertedToGB = document[0].size! / Math.pow(1024, 3);
      const sizeConverted = parseFloat(bytesConvertedToGB.toString());

      setSize(sizeConverted);
      setDocumentURI(document[0].fileCopyUri);
      setExtension(document[0].type);
      setURI(document[0].uri);
      setOriginalNameFile(document[0].name);
      setTitle(document[0].name);

      const data: AppDocumentInterface = {
        fileCopyUri: document[0].fileCopyUri,
        name: title,
        size: document[0].size,
        type: document[0].type,
        uri: document[0].uri,
        copyError: document[0].copyError,
        created_at: new Date(),
        updated_at: new Date(),
        id: user!.id,
      };

      setDocumentData(data);
    } catch (err) {
      console.log('err', err);
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const clearDocumentStates = () => {
    setOriginalNameFile(null);
    setDocumentData(null);
    setDocumentURI(null);
    setExtension(null);
    setTitle(null);
    setSize(null);
    setURI(null);
  };

  const handleUploadFile = async () => {
    setUploading(true);
    toastSuccess({
      text1: t('COMPONENTS.UPLOAD.STATUS.LOADING'),
      text2: t('COMPONENTS.UPLOAD.STATUS.WAIT'),
      autoHide: !uploading,
    });

    try {
      if (uri) {
        // const fileContent = await readFile(uri, 'base64');

        // const documentTouint8Array = new Uint8Array(
        //   fileContent.match(/[\s\S]/g)!.map(char => char.charCodeAt(0)),
        // );

        // const response = await fetch(uri);
        // const blob = await response.blob();
        // console.log(blob);
        await FirebaseServices.storage.post
          .uploadFile(user!.id, uri)
          .then(() => {
            setUploading(false);
            console.log('Veio pro then');
            toastSuccess({
              text1: t('COMPONENTS.UPLOAD.STATUS.SENT_SUCCESSFULLY'),
            });
          })
          .catch(() => {
            console.log('catchhhhh');
          });
        clearDocumentStates();
      }
    } catch (e) {
      setUploading(false);
      console.log('catcho');
      console.log(e);
    }
  };

  const handleOnPressRemoveDocumentPicked = () => {
    clearDocumentStates();
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header right="logout" />
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : -300}>
            <UploadComponent
              onPressChooseFile={handlePickerDocument}
              onPressSeeMyFiles={() => {}}
              size={size!}
              title={title ?? ''}
              hasDocumentPicked={documentData ? true : false}
              onPressRemoveDocumentPicked={handleOnPressRemoveDocumentPicked}
            />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

export default UploadScreen;
