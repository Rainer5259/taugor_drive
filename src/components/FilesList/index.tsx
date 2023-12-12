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
import {AppDocumentInterface} from '~/shared/utils/types/document';
import {formatInputValue} from '~/shared/utils/functions/formatters.ts';

const FilesList: FC<FilesListProps> = ({
  // selectedFile,
  // setSelectedFile,
  style,
}) => {
  const [folders, setFolders] = useState<
    FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]
  >([]);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [bytesToGBToFixed, setBytesToGBToFixed] = useState<number>(0);
  const {user} = useSelector((state: RootState) => state.user);

  const sortedData = folders.sort((a, b) => {
    const titleA = a.data()?.title || '';
    const titleB = b.data()?.title || '';
    return titleA.localeCompare(titleB);
  });
  const newSortedData = folders.map(e => e);
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
        {item.map((e, i) => {
          const document = e.data() as AppDocumentInterface;
          const BytesToGB = formatInputValue(document.metadata?.size, 'size');

          console.log('bytes to gb', BytesToGB?.reference);
          switch (BytesToGB.reference) {
            case 'B':
              setBytesToGBToFixed(parseFloat(bytesToGBToFixed.toFixed(4)));
              break;
            case 'KB':
              setBytesToGBToFixed(parseFloat(bytesToGBToFixed.toFixed(3)));
              break;
            case 'GB':
              setBytesToGBToFixed(parseFloat(bytesToGBToFixed.toFixed(2)));
              break;
          }

          return (
            document !== undefined && (
              <TouchableOpacity
                key={e.id}
                style={[styles(selectedFile, e.id).content]}
                activeOpacity={0.8}
                onPress={() =>
                  setSelectedFile(state => (state === e.id ? '' : e.id))
                }>
                <View style={styles().childrenContentAlignment}>
                  <FolderIcon
                    width={24}
                    height={24}
                    opacity={
                      selectedFile === '' ? 1 : selectedFile === e.id ? 1 : 0.3
                    }
                  />
                </View>
                <View style={styles(selectedFile, e.id).contentTextsBox}>
                  <Text style={styles().contentTitleText}>
                    {document?.title}
                  </Text>
                  {selectedFile === e.id && (
                    <Text style={styles().contentExtensionText}>
                      {document.metadata?.contentType}
                    </Text>
                  )}
                  {selectedFile === e.id && BytesToGB.size !== undefined ? (
                    <Text style={styles().contentSizeText}>
                      {`${BytesToGB?.size.toFixed(1)}${BytesToGB.reference}`}
                    </Text>
                  ) : null}
                </View>

                {selectedFile === e.id && (
                  <Text style={styles().dateText}>
                    {document.metadata?.timeCreated.substring(0, 10)}
                  </Text>
                )}
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
        data={[newSortedData]}
        keyExtractor={(id, i) => id[i].toString()}
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
