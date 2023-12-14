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
import {useTypedNavigation} from '~/routes/useTypedNavigation';
import FirebaseServices from '~/services/firebase';
import {AppDocumentInterface} from '~/shared/utils/types/document';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

const FilesScreen: React.FC = () => {
  const [selectedFolderID, setSelectedFolderID] = useState<string>('');
  const [searchName, setSearchName] = useState<string>('');
  const [documentsData, setDocumentsData] = useState<AppDocumentInterface[]>(
    [],
  );
  const [searchData, setSearchData] = useState<
    AppDocumentInterface[] | undefined
  >();
  const [searchResultsData, setSearchResultsData] = useState<
    AppDocumentInterface[] | undefined
  >();

  const {user} = useSelector((state: RootState) => state.user);
  const navigation = useTypedNavigation();

  const handleFetchUserDocuments = async () => {
    try {
      const userDocumentsRes =
        await FirebaseServices.firestore.get.userDocuments(user!.id);

      setDocumentsData(userDocumentsRes);
      const newCollectionSubFolders = userDocumentsRes.filter(e => e.folder);
      const folder = newCollectionSubFolders.map(e =>
        e?.folder ? e?.folder : null,
      );
      const root = userDocumentsRes.filter(e => e);
      setSearchData([...root, ...(folder[0] ?? [])]);
    } catch (e) {}
  };

  useEffect(() => {
    handleFetchUserDocuments();
  }, []);

  useEffect(() => {
    const newDocumentsData = searchData?.filter((d, index) =>
      d.searchName?.includes(searchName.toLowerCase()),
    );
    setSearchResultsData(newDocumentsData);
  }, [searchName]);

  const handleNavigateToFolderFiles = useCallback(() => {
    if (selectedFolderID) {
      navigation.navigate('FilesFolder', {folderID: selectedFolderID});
      return;
    }
  }, [selectedFolderID]);

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
        <View style={styles.FoldersListBox}>
          <FoldersList
            selectedFolderID={selectedFolderID}
            setSelectedFolderID={setSelectedFolderID}
            style={styles.flatListContainer}
            onPressFolder={handleNavigateToFolderFiles}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FilesScreen;
