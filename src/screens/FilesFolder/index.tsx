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
  const [currentFolderTitle, setCurrentFolderTitle] = useState<string>('');
  const [documentsData, setDocumentsData] = useState<AppDocumentInterface[]>(
    [],
  );
  const [searchResultsData, setSearchResultsData] = useState<
    AppDocumentInterface[] | undefined
  >([]);
  const [searchData, setSearchData] = useState<AppDocumentInterface[] | null>(
    null,
  );

  const handleFetchUserDocuments = async () => {
    try {
      const userDocumentsRes =
        await FirebaseServices.firestore.get.documentByFolderID(
          user!.id,
          route.params.folderID,
        );

      const {folderTitle} = await FirebaseServices.firestore.get.folderByID(
        user!.id,
        route.params.folderID,
      );

      setCurrentFolderTitle(folderTitle ?? '');

      const newCollectionSubFolders = userDocumentsRes.filter(e => e.folder);
      const folder = newCollectionSubFolders.map(e =>
        e?.folder ? e?.folder : null,
      );
      const root = userDocumentsRes.filter(e => e);
      console.log(root);

      setSearchData(root);
      console.log();

      setDocumentsData(userDocumentsRes);
    } catch (e) {}
  };

  useEffect(() => {
    const newDocumentsData = searchData?.filter((d, index) =>
      d.searchName?.includes(searchName.toLowerCase()),
    );
    setSearchResultsData(newDocumentsData);
  }, [searchName]);

  useEffect(() => {
    handleFetchUserDocuments();
  }, []);

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
            isFolder={true}
            folderTitle={currentFolderTitle}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FilesFolderScreen;
