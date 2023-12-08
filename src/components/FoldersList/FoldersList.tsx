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
                <FolderIcon width={36} height={36} />
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
      data={[data]}
      keyExtractor={(id, i) => id.toString()}
      renderItem={({item}) => renderFolders(item)}
      horizontal
      style={styles().flatList}
      contentContainerStyle={{alignItems: 'center'}}
    />
  );
};

export {FoldersList};
