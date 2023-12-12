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
  AppDocumentFolderInterface,
  AppDocumentInterface,
} from '~/shared/utils/types/document';

const FoldersList: FC<FoldersListProps> = ({
  selectedFolderID,
  setSelectedFolderID,
  addNewFolderButton,
  onPressFolder,
  style,
}) => {
  const [folders, setFolders] = useState<AppDocumentInterface[]>([]);

  const {user} = useSelector((state: RootState) => state.user);

  const sortedData = folders.sort((a, b) => {
    const titleA = a?.title || '';
    const titleB = b?.title || '';
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
      const userDocumentsRes =
        await FirebaseServices.firestore.get.userDocuments(user!.id);
      setFolders(userDocumentsRes);
    } catch (e) {}
  };

  useEffect(() => {
    handleFetchUserDocuments();
  }, [user?.id]);

  const handleOnPressFolder = (folderID: string) => {
    if (onPressFolder) {
      onPressFolder();
    }
  };

  const renderFolders = (item: AppDocumentInterface) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles(selectedFolderID!, item.id).content}
        onPress={() => {
          setSelectedFolderID(state => (state === item.id ? '' : item.id));
          handleOnPressFolder(item.id);
        }}>
        <FolderIcon
          width={36}
          height={36}
          opacity={
            selectedFolderID === '' ? 1 : selectedFolderID === item.id ? 1 : 0.6
          }
        />
        <Text style={styles().textContent}>{item.title}</Text>
      </TouchableOpacity>
    );
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
