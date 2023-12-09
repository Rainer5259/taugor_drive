import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {styles} from './styles';
import Header from '~/components/Header';
import {t} from 'i18next';
import SearchInput from '~/components/SearchInput';
import {FoldersList} from '~/components/FoldersList/FoldersList';
import FirebaseServices from '~/services/firebase';
import {useSelector} from 'react-redux';
import {RootState} from '~/services/redux/store';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {FilesList} from '~/components/FilesList';
const FilesScreen: React.FC = () => {
  const {user} = useSelector((state: RootState) => state.user);
  const [selectedFolderID, setSelectedFolderID] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header
        left="chevron-left"
        title={t('COMPONENTS.HEADER.SCREENS_NAME.FILES')}
        right="logout"
      />
      <View style={styles.container}>
        <SearchInput />
        <View style={styles.FilesListBox}>
          <FilesList />
        </View>
        <View style={styles.FoldersListBox}>
          <FoldersList
            selectedFolderID={selectedFolderID}
            setSelectedFolderID={setSelectedFolderID}
            style={styles.flatListContainer}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FilesScreen;
