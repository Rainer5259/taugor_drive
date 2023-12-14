import React, {FC, useEffect, useState} from 'react';
import {FoldersListProps} from './interface';
import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import FolderIcon from '~/assets/svgs/folder-icon.svg';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {styles} from './styles';
import {t} from 'i18next';
import FirebaseServices from '~/services/firebase';
import {useSelector} from 'react-redux';
import {RootState} from '~/services/redux/store';
import PlusIcon from '~/assets/svgs/plus-icon.svg';
import {colors} from '~/shared/themes/colors';
import {
  AppDocumentInterface,
  AppFolderDocumentInterface,
  IFirebaseDocChangeData,
} from '~/shared/utils/types/document';

const FoldersList: FC<FoldersListProps> = ({
  selectedFolderID,
  setSelectedFolderID,
  addNewFolderButton,
  onPressFolder,
  style,
}) => {
  const [folders, setFolders] = useState<IFirebaseDocChangeData[]>([]);

  const {user} = useSelector((state: RootState) => state.user);

  const sortedData = folders.sort((a, b) => {
    const titleA = a?.data().title || '';
    const titleB = b?.data().title || '';
    return titleA.localeCompare(titleB);
  });

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

  const handleFetchUserDocuments = async () => {
    try {
      const userDocumentsRes = await FirebaseServices.firestore.get.userFolders(
        user!.id,
      );
      const results = userDocumentsRes.map(e => e);
      setFolders(results);
    } catch (e) {}
  };

  const handleOnPressFolder = () => {
    if (onPressFolder) {
      onPressFolder();
    }
  };

  useEffect(() => {
    handleFetchUserDocuments();
  }, [user?.id]);

  const renderFolders = (item: IFirebaseDocChangeData) => {
    const docFiles = item?.data();
    // console.log(docFiles);

    return docFiles?.folder ? (
      <TouchableOpacity
        key={item?.id}
        style={styles(selectedFolderID!, item?.id).content}
        onPress={() => {
          setSelectedFolderID(state => (state === item?.id ? '' : item?.id));
          handleOnPressFolder();
        }}>
        <FolderIcon
          width={36}
          height={36}
          opacity={
            selectedFolderID === ''
              ? 1
              : selectedFolderID === item?.id
              ? 1
              : 0.6
          }
        />
        <Text style={styles().textContent}>{docFiles?.folderTitle}</Text>
      </TouchableOpacity>
    ) : null;
  };

  const renderAddFolderButton = () => {
    return (
      <TouchableOpacity
        style={styles().createFolderButton}
        onPress={handleShowPromptCreateFolder}>
        <PlusIcon width={32} height={32} style={{marginBottom: 4}} />
      </TouchableOpacity>
    );
  };

  return sortedData[0] ? (
    <View>
      <Text style={styles().titleText}>
        {t('COMPONENTS.FOLDERS_LIST.TITLE')}
      </Text>

      <View
        style={{
          backgroundColor: colors.secondaryBackgroundOpaque,
          height: 100,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {addNewFolderButton && renderAddFolderButton()}
        <FlatList
          data={sortedData}
          keyExtractor={item => item.id}
          renderItem={({item}) => renderFolders(item)}
          horizontal
          style={[styles().flatList, style]}
          contentContainerStyle={styles().contentContainerFlatList}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  ) : (
    <View style={styles().emptyListView}>
      <Text style={styles().titleText}>
        {t('COMPONENTS.FOLDERS_LIST.NO_FOLDER')}
      </Text>
      {renderAddFolderButton()}
    </View>
  );
};

export {FoldersList};
