import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {styles} from './styles';
import Header from '~/components/Header';
import {t} from 'i18next';
import SearchInput from '~/components/SearchInput';
import {FoldersList} from '~/components/FoldersList/FoldersList';
import {useSelector} from 'react-redux';
import {RootState} from '~/services/redux/store';
import {FilesList} from '~/components/FilesList';
import {AppScreens, RootStackParamList} from '~/routes/AppScreens';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FirebaseServices from '~/services/firebase';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {AppDocumentInterface} from '~/shared/utils/types/document';

const FilesFolderScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'FilesFolder'>) => {
  const {user} = useSelector((state: RootState) => state.user);

  const [searchName, setSearchName] = useState<string>('');
  const [documentsData, setDocumentsData] = useState<AppDocumentInterface[]>(
    [],
  );
  const [searchResultsData, setSearchResultsData] = useState<
    AppDocumentInterface[]
  >([]);

  const handleFetchUserDocuments = async () => {
    try {
      const userDocumentsRes =
        await FirebaseServices.firestore.get.documentByFolderID(
          user!.id,
          route.params.folderID,
        );
      console.log(userDocumentsRes);
      setDocumentsData(userDocumentsRes);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchFiles = async () => {
    try {
      const response = await FirebaseServices.firestore.get.searchDocument(
        user!.id,
        searchName.toLowerCase(),
      );
      setSearchResultsData(response);
    } catch (error) {
      console.log('catch', error);
    }
  };

  useEffect(() => {
    handleFetchUserDocuments();
  }, []);

  useEffect(() => {
    handleSearchFiles();
  }, [searchName]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header
        left="chevron-left"
        title={t('COMPONENTS.HEADER.SCREENS_NAME.FILES')}
        right="logout"
      />
      <View style={styles.container}>
        <SearchInput onChangeText={e => setSearchName(e)} />
        <View style={styles.FilesListBox}>
          <FilesList
            searchName={searchName}
            documentsData={documentsData}
            searchData={searchResultsData}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FilesFolderScreen;
