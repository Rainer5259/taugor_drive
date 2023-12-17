import React, {FC, useEffect, useMemo, useState} from 'react';
import {FoldersListProps} from './interface';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import FolderIcon from '~/assets/svgs/folder-icon.svg';
import {styles} from './styles';
import {t} from 'i18next';
import FirebaseServices from '~/services/firebase';
import {useSelector} from 'react-redux';
import {RootState} from '~/services/redux/store';
import PlusIcon from '~/assets/svgs/plus-icon.svg';
import {IFirebaseDocChangeData} from '~/shared/utils/types/document';
import Dialog from 'react-native-dialog';
import toastError from '../ToastNotification/Error';

const FoldersList: FC<FoldersListProps> = ({
  selectedFolderID,
  setSelectedFolderID,
  addNewFolderButton,
  onPressFolder,
  title,
  style,
}) => {
  const [folders, setFolders] = useState<IFirebaseDocChangeData[]>([]);
  const [folderName, setFolderName] = useState<string>('');
  const [isDialogVisible, setDialogVisible] = useState(false);

  const {user} = useSelector((state: RootState) => state.user);

  const sortedData = folders.sort((a, b) => {
    const titleA = a?.data().title || '';
    const titleB = b?.data().title || '';
    return titleA.localeCompare(titleB);
  });

  const dialogPrompt = () => {
    return (
      <Dialog.Container
        visible={isDialogVisible}
        footerStyle={styles().dialogContainerFooter}
        headerStyle={styles().dialogContainerHeader}>
        <Dialog.Title>{t('COMPONENTS.FOLDERS_LIST.FOLDER_NAME')}</Dialog.Title>
        <Dialog.Input
          onChangeText={e => setFolderName(e)}
          maxLength={30}
          onChange={e =>
            e.nativeEvent.text.length === 30 &&
            toastError({text1: t('COMPONENTS.FOLDERS_LIST.MAX_LIMIT_OF_CHAR')})
          }
        />

        <Dialog.Button
          onPress={() => setDialogVisible(false)}
          label={t('COMPONENTS.FOLDERS_LIST.CANCEL')}
        />

        <Dialog.Button
          onPress={() => handleCreateFolder()}
          label={t('COMPONENTS.FOLDERS_LIST.CREATE')}
        />
      </Dialog.Container>
    );
  };

  const handleShowPromptCreateFolder = () => {
    setDialogVisible(true);
  };

  const handleCreateFolder = async () => {
    if (folderName.length === 0) {
      return toastError({text1: t('COMPONENTS.FOLDERS_LIST.TYPE_FOLDER_NAME')});
    }

    setDialogVisible(false);
    try {
      await FirebaseServices.firestore.post.createFolder(user!.id, folderName);
    } catch {}
    await handleFetchUserDocuments();
    setFolderName('');
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
      onPressFolder(selectedFolderID);
    }
  };

  useEffect(() => {
    handleFetchUserDocuments();
  }, [user?.id]);

  const renderFolders = (item: IFirebaseDocChangeData) => {
    const docFiles = item?.data();

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
    return addNewFolderButton ? (
      <TouchableOpacity
        style={styles().createFolderButton}
        onPress={handleShowPromptCreateFolder}>
        <PlusIcon width={32} height={32} style={{marginBottom: 4}} />
      </TouchableOpacity>
    ) : null;
  };

  return (
    <>
      {isDialogVisible && dialogPrompt()}
      {sortedData[0] ? (
        <View>
          <Text style={styles().titleText}>
            {title ?? t('COMPONENTS.FOLDERS_LIST.TITLE')}
          </Text>

          <View style={styles().createFolderContainer}>
            {renderAddFolderButton()}
            <FlatList
              data={sortedData}
              keyExtractor={item => item.id}
              renderItem={({item}) => renderFolders(item)}
              horizontal
              style={[styles().flatList, style]}
              contentContainerStyle={styles().contentContainerFlatList}
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </View>
      ) : (
        <View style={styles().emptyListView}>
          <View style={styles().emptyListViewContent}>
            <Text style={styles().titleText}>
              {t('COMPONENTS.FOLDERS_LIST.NO_FOLDER')}
            </Text>
            <View style={styles().addButtonEmptyListView}>
              {renderAddFolderButton()}
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export {FoldersList};
