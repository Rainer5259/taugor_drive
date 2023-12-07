import React, {FC, useState} from 'react';
import {FoldersListProps} from './interface';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import FolderIcon from '~/assets/svgs/folder-icon.svg';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {AppDocumentInterface} from '~/shared/utils/types/document';
import {colors} from '~/shared/themes/colors';
import PlusIcon from '~/assets/svgs/plus-icon.svg';

const FoldersList: FC<FoldersListProps> = ({
  data,
  selectedFolderID,
  setSelectedFolderID,
}) => {
  // const [selectedFolderID, setSelectedFolderID] = useState<string>();

  const renderFolders = (item: FirebaseFirestoreTypes.DocumentSnapshot[]) => {
    return (
      <>
        {item.map(e => {
          const document = e.data()?.folder as AppDocumentInterface[];

          return (
            document !== undefined && (
              <TouchableOpacity
                key={e?.id}
                style={{
                  marginHorizontal: 4,
                  width: 110,
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  height: 90,
                  marginVertical: 10,
                  backgroundColor:
                    selectedFolderID === e.id
                      ? colors.primaryCharcoalOpaque
                      : colors.secondaryCharcoal,
                  borderRadius: 6,
                  opacity: selectedFolderID === e.id ? 1 : 0.5,
                }}
                onPress={() => setSelectedFolderID(e?.id)}>
                <FolderIcon width={36} height={36} />
                <Text
                  style={{
                    fontSize: 12,
                    paddingHorizontal: 4,
                    color: colors.primaryWhite,
                  }}>
                  {document[0]?.title}
                </Text>
              </TouchableOpacity>
            )
          );
        })}
      </>
    );
  };

  const renderListHeader = () => {
    return (
      <TouchableOpacity style={{marginHorizontal: 10}}>
        <PlusIcon width={50} height={50} />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={[data]}
      keyExtractor={(id, i) => id.toString()}
      renderItem={({item}) => renderFolders(item)}
      horizontal
      style={{
        backgroundColor: colors.secondaryText + '50',
        marginHorizontal: 10,
        borderRadius: 6,
        height: 100,
      }}
      contentContainerStyle={{alignItems: 'center'}}
    />
  );
};

export {FoldersList};
