import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from './styles';
import UploadComponent from '~/components/UploadComponent';
import Header from '~/components/Header';
import DocumentPicker from 'react-native-document-picker';
import FirebaseServices from '~/services/firebase';
import {AppDocumentInterface} from '~/shared/utils/types/document';
import {useSelector} from 'react-redux';
import {RootState} from '~/services/redux/store';
import toastSuccess from '~/components/ToastNotification/Success';
import {t} from 'i18next';
import {FirebaseStorageTypes} from '@react-native-firebase/storage';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {FoldersList} from '~/components/FoldersList/FoldersList';
import firebaseDatabase from '@react-native-firebase/database';
import toastError from '~/components/ToastNotification/Error';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

const UploadScreen: React.FC = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [extension, setExtension] = useState<string | null>();
  const [title, setTitle] = useState<string>('');
  const [uri, setURI] = useState<string | null>(null);
  const [size, setSize] = useState<number | null>(0);
  const [userDocuments, setUserDocuments] = useState<AppDocumentInterface[]>(
    [],
  );

  const [selectedFolderID, setSelectedFolderID] = useState<string>('');

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
      setTitle(document[0].name ?? '');
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

            await handleUploadDataToFirestore(res)
              .then(async firestoreRes => {})
              .catch(error => {});
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
        <TouchableOpacity
          style={{width: 80, height: 40, backgroundColor: 'green'}}
          onPress={() => {
            async () =>
              await FirebaseServices.storage.post.deleteAllFiles(user!.id);
          }}>
          <Text>Apagar todos os meus dados</Text>
        </TouchableOpacity>
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

        <FoldersList
          setSelectedFolderID={setSelectedFolderID}
          selectedFolderID={selectedFolderID}
          style={styles.flatList}
          addNewFolderButton
        />
      </View>
    </SafeAreaView>
  );
};

export default UploadScreen;
