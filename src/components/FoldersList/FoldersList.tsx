import React, {FC} from 'react';
import {FoldersListProps} from './interface';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import FolderIcon from '~/assets/svgs/folder-icon.svg';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {styles} from './styles';

const FoldersList: FC<FoldersListProps> = ({
  data,
  selectedFolderID,
  setSelectedFolderID,
}) => {
  const sortedData = data.sort((a, b) => {
    const titleA = a.data()?.title || '';
    const titleB = b.data()?.title || '';
    return titleA.localeCompare(titleB);
  });

  const renderFolders = (item: FirebaseFirestoreTypes.DocumentSnapshot[]) => {
    return (
      <>
        {item.map(e => {
          const document = e.data();

          return (
            document !== undefined && (
              <TouchableOpacity
                key={e.id}
                style={styles(selectedFolderID!, e.id).content}
                onPress={() =>
                  setSelectedFolderID(state => (state === e.id ? null : e.id))
                }>
                <FolderIcon
                  width={36}
                  height={36}
                  opacity={
                    selectedFolderID === null
                      ? 1
                      : selectedFolderID === e.id
                      ? 1
                      : 0.6
                  }
                />
                <Text style={styles().textContent}>{document.title}</Text>
              </TouchableOpacity>
            )
          );
        })}
      </>
    );
  };

  return (
    <FlatList
      data={[sortedData]}
      keyExtractor={(id, i) => id.toString()}
      renderItem={({item}) => renderFolders(item)}
      horizontal
      style={styles().flatList}
      contentContainerStyle={styles().contentContainerFlatList}
    />
  );
};

export {FoldersList};
