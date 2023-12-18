import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from './styles';
import UploadComponent from '~/components/UploadComponent';
import Header from '~/components/Header';
import DocumentPicker from 'react-native-document-picker';
import FirebaseServices from '~/services/firebase';
import {AppDocumentInterface} from '~/shared/utils/types/document';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/services/redux/store';
import toastSuccess from '~/components/ToastNotification/Success';
import {t} from 'i18next';
import {FirebaseStorageTypes} from '@react-native-firebase/storage';
import {ReactNativeFirebase} from '@react-native-firebase/app';
import {FoldersList} from '~/components/FoldersList/FoldersList';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {setUploading} from '~/services/redux/slices/authenticateUser';
import toastError from '~/components/ToastNotification/Error';
import {StorageErrorCodesCustom} from '~/shared/utils/types/StorageError';
import {colors} from '~/shared/themes/colors';

const UploadScreen: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [uri, setURI] = useState<string | null>(null);
  const [size, setSize] = useState<number | null>(0);
  const [pickingFile, setPickingFile] = useState<boolean>(false);
  const [selectedFolderID, setSelectedFolderID] = useState<string>('');

  const {user, totalBytesUsed, limitUpload} = useSelector(
    (state: RootState) => state.user,
  );

  const dispatch = useDispatch();

  const handlePickerDocument = async () => {
    clearDocumentStates();

    if (uri) {
      return handleUploadFile();
    }

    try {
      setPickingFile(true);
      const limitGB = 1073741824;
      const document = await DocumentPicker.pick({
        type: DocumentPicker.types.allFiles,
        copyTo: 'cachesDirectory',
      });

      if (document[0].size && document[0].size > limitGB) {
        toastError({text1: t('COMPONENTS.UPLOAD.MAX_LIMIT_PER_FILE')});
        return;
      }

      if (document[0].size && totalBytesUsed) {
        const fileSize = document[0].size / Math.pow(1024, 3);
        const totalSize = fileSize + totalBytesUsed;
        if (totalSize > limitUpload) {
          toastError({text1: t('COMPONENTS.UPLOAD.EXCEEDED_STORAGE_LIMIT')});
          return;
        }
      }

      const sizeConverted = parseFloat(document[0].size!.toString());
      setTitle(document[0].name ?? '');
      setSize(sizeConverted);
      setURI(document[0].fileCopyUri ?? document[0].uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    } finally {
      setPickingFile(false);
    }
  };

  const clearDocumentStates = () => {
    setTitle('');
    setSize(null);
    setURI(null);
  };

  const handleUploadDataToFirestore = async (
    documentSnapshot: FirebaseStorageTypes.TaskSnapshot,
  ) => {
    const fileID = uuidv4();
    try {
      const appDocument: AppDocumentInterface = {
        ...documentSnapshot,
        id: user!.id,
        title,
        fileID,
        folderID: selectedFolderID,
        searchName: title!.toLowerCase(),
      };
      await FirebaseServices.firestore.post.sendDocument(
        user!.id,
        appDocument,
        selectedFolderID,
      );

      if (!documentSnapshot) {
        return;
      }
    } catch (e) {}
  };

  const handleUploadFile = async () => {
    dispatch(setUploading(true));

    if (uri) {
      toastSuccess({
        text1: t('COMPONENTS.UPLOAD.STATUS.LOADING'),
        text2: t('COMPONENTS.UPLOAD.STATUS.WAIT'),
        autoHide: false,
      });
      try {
        await FirebaseServices.storage.post
          .uploadFile(user!.id, uri)
          .then(async res => {
            await handleUploadDataToFirestore(res).then(() => {
              clearDocumentStates();
              dispatch(setUploading(false));
              toastSuccess({
                text1: t('COMPONENTS.UPLOAD.STATUS.SENT_SUCCESSFULLY'),
              });
            });
          });
      } catch (e) {
        dispatch(setUploading(false));
        clearDocumentStates();
        const error = e as ReactNativeFirebase.NativeFirebaseError;
        switch (error.code) {
          case `storage/${StorageErrorCodesCustom.UNKNOWN}`:
            toastError({
              text1: t('GENERICS.UNKNOWN_ERROR'),
            });
            break;
        }
      }
    }
  };

  const handleOnPressRemoveDocumentPicked = () => {
    clearDocumentStates();
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        animated
        barStyle="dark-content"
        backgroundColor={colors.primaryBackground}
      />
      <View style={styles.container}>
        <Header
          left="files"
          title={t('COMPONENTS.HEADER.SCREENS_NAME.UPLOAD')}
          right={'logout'}
          style={styles.header}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : 0}
            contentContainerStyle={styles.keyboardAvoidingViewContainer}
            style={styles.keyboardAvoidingView}>
            <View style={styles.keyboardAvoidingViewContent}>
              <UploadComponent
                onPressChooseFile={handlePickerDocument}
                size={size!}
                title={title ?? ''}
                hasDocumentPicked={uri ? true : false}
                onPressRemoveDocumentPicked={handleOnPressRemoveDocumentPicked}
                setTitle={setTitle}
                pickingFile={pickingFile}
              />
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        <View style={[styles.flatListBox]}>
          <FoldersList
            setSelectedFolderID={setSelectedFolderID}
            selectedFolderID={selectedFolderID}
            style={styles.flatList}
            addNewFolderButton
            title={t('COMPONENTS.FOLDERS_LIST.CHOOSE_FOLDER')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UploadScreen;
