import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from './styles';
import Header from '~/components/Header';
import {t} from 'i18next';
import {FoldersList} from '~/components/FoldersList/FoldersList';
import {useSelector} from 'react-redux';
import {RootState} from '~/services/redux/store';
import {FilesList} from '~/components/FilesList';
import {useTypedNavigation} from '~/routes/useTypedNavigation';
import FirebaseServices from '~/services/firebase';
import {AppDocumentInterface} from '~/shared/utils/types/document';
import useCheckLargeScreen from '~/shared/hooks/useLargeScreen';

const FilesScreen: React.FC = () => {
  const [selectedFolderID, setSelectedFolderID] = useState<string>('');
  const [documentsData, setDocumentsData] = useState<AppDocumentInterface[]>(
    [],
  );
  const [searchData, setSearchData] = useState<AppDocumentInterface[]>([]);
  const [keyboardIsFocused, setKeyboardIsFocused] = useState<boolean>(false);

  const {user} = useSelector((state: RootState) => state.user);
  const navigation = useTypedNavigation();
  const heightContainer = useCheckLargeScreen() ? 900 : 480;

  const handleFetchUserDocuments = async () => {
    try {
      const userDocumentsRes =
        await FirebaseServices.firestore.get.userDocuments(user!.id);

      const newCollectionSubFolders = userDocumentsRes.filter(e => e.folder);
      const folder = newCollectionSubFolders.map(e => {
        return e?.folder ? e?.folder : [];
      });
      const root = userDocumentsRes.filter(e => e);

      const filterItemsFolder = folder.find(e =>
        e?.filter(doc => {
          return doc;
        }),
      );
      setDocumentsData(userDocumentsRes);
      setSearchData([...root, ...(filterItemsFolder ?? [])]);
    } catch (e) {}
  };

  useEffect(() => {
    handleFetchUserDocuments();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardIsFocused(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardIsFocused(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleNavigateToFolder = (folderID: string) => {
    if (selectedFolderID) {
      navigation.navigate('FilesFolder', {folderID});
      return;
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 400 : -300}
          style={{flex: 1}}>
          <Header
            left="chevron-left"
            title={t('COMPONENTS.HEADER.SCREENS_NAME.FILES')}
            right="logout"
          />
          <View style={styles.container}>
            <View style={[styles.FilesListBox, {height: heightContainer}]}>
              <FilesList
                documentsData={documentsData}
                searchData={searchData}
              />
            </View>
          </View>
          <View
            style={[
              styles.FoldersListBox,
              keyboardIsFocused && {bottom: -100},
            ]}>
            <FoldersList
              selectedFolderID={selectedFolderID}
              setSelectedFolderID={setSelectedFolderID}
              style={styles.flatListContainer}
              onPressFolder={handleNavigateToFolder}
              addNewFolderButton={false}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default FilesScreen;
