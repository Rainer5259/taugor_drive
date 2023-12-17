import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {styles} from './styles';
import Header from '~/components/Header';
import {t} from 'i18next';
import {useSelector} from 'react-redux';
import {RootState} from '~/services/redux/store';
import {FilesList} from '~/components/FilesList';
import {RootStackParamList} from '~/routes/AppScreens';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FirebaseServices from '~/services/firebase';
import {AppDocumentInterface} from '~/shared/utils/types/document';
import useCheckLargeScreen from '~/shared/hooks/useLargeScreen';

const FilesFolderScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'FilesFolder'>) => {
  const [currentFolderTitle, setCurrentFolderTitle] = useState<string>('');
  const [searchData, setSearchData] = useState<AppDocumentInterface[]>([]);
  const [documentsData, setDocumentsData] = useState<AppDocumentInterface[]>(
    [],
  );

  const {user} = useSelector((state: RootState) => state.user);
  const heightContainer = useCheckLargeScreen() ? 900 : 600;

  const handleFetchUserDocuments = async () => {
    try {
      const userDocumentsResponse =
        await FirebaseServices.firestore.get.documentByFolderID(
          user!.id,
          route.params.folderID,
        );

      const {folderTitle} = await FirebaseServices.firestore.get.folderByID(
        user!.id,
        route.params.folderID,
      );

      const root = userDocumentsResponse.filter(e => {
        return e;
      });

      setCurrentFolderTitle(folderTitle ?? '');
      setSearchData(root);
      setDocumentsData(root);
    } catch (e) {}
  };

  useEffect(() => {
    handleFetchUserDocuments();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header
        left="chevron-left"
        title={t('COMPONENTS.HEADER.SCREENS_NAME.FILES_FOLDER')}
        right="logout"
      />
      <View style={[styles.container]}>
        <View style={[styles.FilesListBox, {height: heightContainer}]}>
          <FilesList
            documentsData={documentsData}
            searchData={searchData}
            isFolder={true}
            folderTitle={currentFolderTitle}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FilesFolderScreen;
