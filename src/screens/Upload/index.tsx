import React, {useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
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
import {FirebaseStorageTypes} from '@react-native-firebase/storage';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {FoldersList} from '~/components/FoldersList/FoldersList';
import PlusIcon from '~/assets/svgs/plus-icon.svg';

const UploadScreen: React.FC = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [extension, setExtension] = useState<string | null>();
  const [title, setTitle] = useState<string | null>(null);
  const [uri, setURI] = useState<string | null>(null);
  const [size, setSize] = useState<number | null>(0);
  const [userDocuments, setUserDocuments] = useState<
    FirebaseFirestoreTypes.DocumentSnapshot[]
  >([]);

  const [selectedFolderID, setSelectedFolderID] = useState<string | null>('');

  const {user} = useSelector((state: RootState) => state.user);

  const handlePickerDocument = async () => {
    if (uri) {
      return handleUploadFile();
    }

    try {
      const document = await DocumentPicker.pick({
        type: DocumentPicker.types.allFiles,
      });

      const bytesConvertedToGB = document[0].size! / Math.pow(1024, 3);
      const sizeConverted = parseFloat(bytesConvertedToGB.toString());

      setExtension(document[0].type);
      setTitle(document[0].name);
      setSize(sizeConverted);
      setURI(document[0].uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const clearDocumentStates = () => {
    setExtension(null);
    setTitle(null);
    setSize(null);
    setURI(null);
  };

  const handleShowPromptCreateFolder = () => {
    Alert.prompt(t('COMPONENTS.UPLOAD.ALERT.CREATE_FOLDER.TITLE'), '', [
      {
        onPress: () => {},
        text: t('COMPONENTS.UPLOAD.ALERT.CREATE_FOLDER.BUTTON.CANCEL'),
      },
      {
        onPress: (value?: string) => {
          if (value && value.length > 40) {
            return Alert.alert('Máximo 40 caracters');
          }
          if (value) {
            handleCreateFolder(value);
            return;
          } else {
            handleShowPromptCreateFolder();
          }
        },
        text: t('COMPONENTS.UPLOAD.ALERT.CREATE_FOLDER.BUTTON.CONFIRM'),
      },
    ]);
  };

  const handleCreateFolder = async (folderTitle: string) => {
    try {
      await FirebaseServices.firestore.post.createFolder(user!.id, folderTitle);
      await handleFetchUserDocuments();
    } catch (e) {}
  };

  const handleUploadDataToFirestore = async (
    documentSnapshot: FirebaseStorageTypes.TaskSnapshot,
  ) => {
    try {
      const appDocument: AppDocumentInterface = {
        ...documentSnapshot,
        id: user!.id,
        title: title!,
      };
      await FirebaseServices.firestore.post
        .sendDocument(user!.id, appDocument, selectedFolderID)
        .then(() => {})
        .catch(e => {});

      if (!documentSnapshot) {
        return;
      }
    } catch (e) {}
  };

  const handleUploadFile = async () => {
    setUploading(true);

    toastSuccess({
      text1: t('COMPONENTS.UPLOAD.STATUS.LOADING'),
      text2: t('COMPONENTS.UPLOAD.STATUS.WAIT'),
      autoHide: false,
    });

    try {
      if (uri) {
        await FirebaseServices.storage.post
          .uploadFile(user!.id, uri)
          .then(async res => {
            setUploading(false);
            clearDocumentStates();
            toastSuccess({
              text1: t('COMPONENTS.UPLOAD.STATUS.SENT_SUCCESSFULLY'),
            });
            await handleUploadDataToFirestore(res);
          })
          .catch(e => {
            const error = e as FirebaseStorageTypes.Reference;
            switch (error) {
              case e:
                break;
            }
          });
        clearDocumentStates();
      }
    } catch (e) {
      setUploading(false);
    }
  };

  const handleOnPressRemoveDocumentPicked = () => {
    clearDocumentStates();
  };

  const handleFetchUserDocuments = async () => {
    try {
      const userDocumentsRes =
        await FirebaseServices.firestore.get.userDocuments(user!.id);
      setUserDocuments(userDocumentsRes);
    } catch (e) {}
  };

  useEffect(() => {
    handleFetchUserDocuments();
  }, [user?.id]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header
        left="files"
        title={t('COMPONENTS.HEADER.SCREENS_NAME.UPLOAD')}
        right="logout"
      />
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : -300}>
            <UploadComponent
              onPressChooseFile={handlePickerDocument}
              size={size!}
              title={title ?? ''}
              hasDocumentPicked={uri ? true : false}
              onPressRemoveDocumentPicked={handleOnPressRemoveDocumentPicked}
              setTitle={setTitle}
            />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        <View style={styles.listBox}>
          <TouchableOpacity
            style={styles.createFolderButton}
            onPress={handleShowPromptCreateFolder}>
            <PlusIcon width={32} height={32} />
          </TouchableOpacity>
          <FoldersList
            setSelectedFolderID={setSelectedFolderID}
            selectedFolderID={selectedFolderID}
            style={styles.flatList}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UploadScreen;
