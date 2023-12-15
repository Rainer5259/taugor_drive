import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {styles} from './styles';
import Header from '~/components/Header';
import {t} from 'i18next';
import SearchInput from '~/components/SearchInput';
import {useSelector} from 'react-redux';
import {RootState} from '~/services/redux/store';
import {FilesList} from '~/components/FilesList';
import {RootStackParamList} from '~/routes/AppScreens';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FirebaseServices from '~/services/firebase';
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
    AppDocumentInterface[]
  >([]);
  const [searchData, setSearchData] = useState<AppDocumentInterface[]>([]);

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

      setDocumentsData(userDocumentsRes);
    } catch (e) {}
  };

  const handleFilterSearch = () => {
    const removeSpecialCharacters = (str: string) => {
      return str?.replace(/[^a-zA-Z0-9]/g, '');
    };
    const sanitizedSearchName = removeSpecialCharacters(
      searchName?.toLowerCase(),
    );

    const newDocumentsData = searchData?.filter((d, index) => {
      const sanitizedDocumentName = removeSpecialCharacters(
        d?.searchName?.toLowerCase(),
      );

      return sanitizedDocumentName?.includes(sanitizedSearchName);
    });
    setSearchResultsData(newDocumentsData ?? []);
  };

  useEffect(() => {
    handleFilterSearch();
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
