import React, {FC, useEffect, useState} from 'react';
import {FilesListProps} from './interface';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ChevronDownIcon from '~/assets/svgs/chevron-down.svg';
import {styles} from './styles';
import {t} from 'i18next';
import {
  AppDocumentInterface,
  AppFolderDocumentInterface,
} from '~/shared/utils/types/document';
import {formatInputValue} from '~/shared/utils/functions/formatters.ts';
import IconPerFileType from '../IconPerFileType';
import useCheckLargeScreen from '~/shared/hooks/useLargeScreen';
import SearchInput from '../SearchInput';

const FilesList: FC<FilesListProps> = ({
  style,
  documentsData,
  searchData,
  folderTitle,
  isFolder,
}) => {
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);
  const [searchResultsData, setSearchResultsData] = useState<
    AppDocumentInterface[]
  >([]);

  const [searchName, setSearchName] = useState<string>('');

  const widthContainer = useCheckLargeScreen() ? 600 : 300;

  const handleLoadMoreItems = () => {
    /**That is only illustration of
     * pagination to preserve call
     * services on API and reduce
     * custs. --Rainer Cordeiro*/

    if (isLoadingMore) {
      return;
    }

    setIsLoadingMore(true);
    const totalItems = searchName
      ? searchData.length
      : newDocumentsSortedData.length;

    if (endIndex < totalItems) {
      setTimeout(() => {
        setStartIndex(prevStartIndex => prevStartIndex + 10);
        setIsLoadingMore(false);
      }, 2000);
      setTimeout(() => {
        setEndIndex(prevEndIndex => Math.min(prevEndIndex + 10, totalItems));
        setIsLoadingMore(false);
      }, 2000);
    } else {
      setIsLoadingMore(false);
    }
  };

  const documentsSortedData = documentsData?.sort((a, b) => {
    const titleA = a?.title || '';
    const titleB = b?.title || '';
    return titleA.localeCompare(titleB);
  });

  const searchSortedData = searchData?.sort((a, b) => {
    const titleA = a?.title || '';
    const titleB = b?.title || '';
    return titleA.localeCompare(titleB);
  });

  const newDocumentsSortedData = documentsSortedData?.filter(e => {
    return !e.folder && e;
  });
  const newSearchSortedData = searchSortedData?.map(e => {
    return e;
  });

  const renderFiles = (item: AppFolderDocumentInterface) => {
    const BytesToGB = formatInputValue(item?.metadata?.size, 'size');

    const fileID = !isFolder ? item?.fileID : item?.fileID;
    const focusedFile = selectedFile === fileID;
    const extension = item?.metadata?.contentType?.split('/');

    return !item?.folder ? (
      <TouchableOpacity
        key={fileID}
        style={[styles(selectedFile, fileID).content, {width: '100%'}]}
        activeOpacity={0.8}
        onPress={() => {
          setSelectedFile(state => (state === fileID ? '' : fileID));
        }}>
        <View style={styles().childrenContentAlignment}>
          <IconPerFileType
            fileType={extension?.[1] || ''}
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

  const handleFilterSearch = () => {
    const removeSpecialCharacters = (str: string) => {
      return str?.replace(/[^a-zA-Z0-9]/g, '');
    };

    const sanitizedSearchName = removeSpecialCharacters(
      searchName?.toLowerCase(),
    );

    const newDocumentsData = newSearchSortedData?.filter((d, index) => {
      const sanitizedDocumentName = removeSpecialCharacters(
        d?.searchName?.toLowerCase(),
      );

      return sanitizedDocumentName?.includes(sanitizedSearchName);
    });
    setSearchResultsData(newDocumentsData);
  };

  useEffect(() => {
    handleFilterSearch();
  }, [searchName]);

  return newDocumentsSortedData ? (
    <View>
      {searchResultsData.length !== 0 || newDocumentsSortedData.length !== 0 ? (
        <SearchInput
          onChangeText={e => setSearchName(e)}
          style={styles().searchInput}
        />
      ) : null}
      <Text style={styles().titleText}>
        {searchName ? (
          t('COMPONENTS.FOLDERS_LIST.SEARCH_RESULT')
        ) : !isFolder ? (
          t('COMPONENTS.FOLDERS_LIST.MAIN_DIRECTORY')
        ) : folderTitle ? (
          folderTitle
        ) : (
          <ActivityIndicator />
        )}
      </Text>
      <FlatList
        data={
          searchName.length > 0
            ? searchResultsData
            : newDocumentsSortedData.slice(startIndex, endIndex)
        }
        keyExtractor={(item, index) => item.fileID ?? `key:${index}`}
        renderItem={({item}) => renderFiles(item)}
        style={[styles().flatList, {width: widthContainer}, style]}
        contentContainerStyle={styles().contentContainerFlatList}
        onEndReached={handleLoadMoreItems}
        onEndReachedThreshold={0.1}
        initialNumToRender={!searchResultsData ? 50 : 10}
        ListFooterComponent={() =>
          isLoadingMore ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null
        }
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
