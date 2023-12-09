import React, {FC, useEffect, useState} from 'react';
import {FilesListProps} from './interface';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import FolderIcon from '~/assets/svgs/folder-icon.svg';
import ChevronDownIcon from '~/assets/svgs/chevron-down.svg';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {styles} from './styles';
import {t} from 'i18next';
import FirebaseServices from '~/services/firebase';
import {useSelector} from 'react-redux';
import {RootState} from '~/services/redux/store';

const FilesList: FC<FilesListProps> = ({
  // selectedFolderID,
  // setSelectedFolderID,
  style,
}) => {
  const [folders, setFolders] = useState<
    FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]
  >([]);

  const {user} = useSelector((state: RootState) => state.user);

  const sortedData = folders.sort((a, b) => {
    const titleA = a.data()?.title || '';
    const titleB = b.data()?.title || '';
    return titleA.localeCompare(titleB);
  });

  const handleFetchUserDocuments = async () => {
    try {
      const userDocumentsRes =
        await FirebaseServices.firestore.get.userDocuments(user!.id);
      setFolders(userDocumentsRes);
    } catch (e) {}
  };

  useEffect(() => {
    handleFetchUserDocuments();
  }, []);

  const renderFolders = (item: FirebaseFirestoreTypes.DocumentSnapshot[]) => {
    return (
      <>
        {item.map(e => {
          const document = e.data();

          return (
            document !== undefined && (
              <TouchableOpacity
                key={e.id}
                style={styles('', e.id).content}
                activeOpacity={0.8}
                onPress={
                  () => {}
                  // setSelectedFolderID(state => (state === e.id ? null : e.id))
                }>
                <FolderIcon
                  width={24}
                  height={24}
                  opacity={
                    // selectedFolderID === null
                    //   ? 1
                    //   : selectedFolderID === e.id
                    //   ? 1
                    //   : 0.6
                    1
                  }
                />
                <Text style={styles().textContent}>{document.title}</Text>

                <ChevronDownIcon style={styles().chevronDownIcon} />
              </TouchableOpacity>
            )
          );
        })}
      </>
    );
  };

  return sortedData[0] ? (
    <View>
      <Text style={styles().titleText}>
        {t('COMPONENTS.FOLDERS_LIST.MAIN_DIRECTORY')}
      </Text>
      <FlatList
        data={[sortedData]}
        keyExtractor={(id, i) => id.toString()}
        renderItem={({item}) => renderFolders(item)}
        style={[styles().flatList, style]}
        contentContainerStyle={styles().contentContainerFlatList}
      />
    </View>
  ) : (
    <View style={styles().emptyListView}>
      <Text style={styles().titleText}>
        {t('COMPONENTS.FOLDERS_LIST.NO_FOLDER')}
      </Text>
    </View>
  );
};

export {FilesList};
