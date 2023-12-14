import React, {FC, useEffect, useState} from 'react';
import {FilesListProps} from './interface';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import FolderIcon from '~/assets/svgs/folder-icon.svg';
import ChevronDownIcon from '~/assets/svgs/chevron-down.svg';
import {styles} from './styles';
import {t} from 'i18next';
import FirebaseServices from '~/services/firebase';
import {useSelector} from 'react-redux';
import {RootState} from '~/services/redux/store';
import {
  AppDocumentInterface,
  AppFolderDocumentInterface,
} from '~/shared/utils/types/document';
import {formatInputValue} from '~/shared/utils/functions/formatters.ts';
import IconPerFileType from '../IconPerFileType';

const FilesList: FC<FilesListProps> = ({
  searchName,
  style,
  setSelectedFileID,
  documentsData,
  searchData,
  folderTitle,
  isFolder,
}) => {
  const [selectedFile, setSelectedFile] = useState<string>('');

  const documentsSortedData = documentsData?.sort((a, b) => {
    const titleA = a?.title || '';
    const titleB = b?.title || '';
    return titleA.localeCompare(titleB);
  });

  const searchSortedData = documentsData?.sort((a, b) => {
    const titleA = a?.title || '';
    const titleB = b?.title || '';
    return titleA.localeCompare(titleB);
  });

  const newDocumentsSortedData = documentsSortedData?.map(e => e);
  const newSearchSortedData = searchSortedData?.map(e => e);

  const renderFiles = (item: AppFolderDocumentInterface) => {
    const BytesToGB = formatInputValue(item?.metadata?.size, 'size');

    const fileID = !isFolder ? item?.fileID : item?.fileID;
    const focusedFile = selectedFile === fileID;
    const extension = item?.metadata?.contentType?.split('/');

    return !item?.folder ? (
      <TouchableOpacity
        key={fileID}
        style={[styles(selectedFile, fileID).content]}
        activeOpacity={0.8}
        onPress={() => {
          setSelectedFile(state => (state === fileID ? '' : fileID));
        }}>
        <View style={styles().childrenContentAlignment}>
          <IconPerFileType
            fileType={extension?.[1]}
            opacity={
              selectedFile === '' ? 1 : selectedFile === fileID ? 1 : 0.6
            }
          />
        </View>
        <View style={styles(selectedFile, fileID).contentTextsBox}>
          <Text style={styles().contentTitleText}>
            {focusedFile ? item?.title : item?.title?.substring(0, 25)}
          </Text>
          {focusedFile && (
            <Text style={styles().contentTitleText}>
              {t('COMPONENTS.FOLDERS_LIST.EXTENSION', {
                type: extension?.[1],
              })}
            </Text>
          )}
          {selectedFile === fileID && BytesToGB.size !== undefined ? (
            <Text style={styles().contentSizeText}>
              {`${BytesToGB?.size.toFixed(1)}${BytesToGB?.reference}`}
            </Text>
          ) : null}
        </View>

        {selectedFile === fileID && (
          <Text style={styles().dateText}>
            {item?.metadata?.timeCreated.substring(0, 10)}
          </Text>
        )}
        <ChevronDownIcon style={styles().chevronDownIcon} />
      </TouchableOpacity>
    ) : null;
  };

  useEffect(() => {
    return;
  }, []);
  return newDocumentsSortedData ? (
    <View>
      <Text style={styles().titleText}>
        {searchName
          ? t('COMPONENTS.FOLDERS_LIST.SEARCH_RESULT')
          : !isFolder
          ? t('COMPONENTS.FOLDERS_LIST.MAIN_DIRECTORY')
          : folderTitle}
      </Text>
      <FlatList
        data={searchName ? searchData : newDocumentsSortedData}
        keyExtractor={(item, i) => item?.fileID ?? `key:${i}`}
        renderItem={({item}) => renderFiles(item)}
        style={[styles().flatList, style]}
        contentContainerStyle={styles().contentContainerFlatList}
      />
    </View>
  ) : (
    <View style={styles().emptyListView}>
      <Text style={styles().titleText}>
        {t('COMPONENTS.FOLDERS_LIST.NO_FILES')}
      </Text>
    </View>
  );
};

export {FilesList};
