import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from './styles';

import {useTypedNavigation} from '~/routes/useTypedNavigation';
import UploadComponent from '~/components/UploadComponent';
import Header from '~/components/Header';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {NativeModules, ModalPropsIOS} from 'react-native';
/// Line 27
const RNDocumentPicker: DocumentPickerResponse = NativeModules.RNDocumentPicker;
const UploadScreen: React.FC = () => {
  const navigation = useTypedNavigation();

  const [file, setFile] = useState<DirectoryPickerResponse | null>();
  const [extension, setExtension] = useState<string | null>();
  const [title, setTitle] = useState<string | null>(null);
  const [size, setSize] = useState<number>(0);
  const [originalNameFile, setOriginalNameFile] = useState<string | null>(null);

  const handlePickerDocument = async () => {
    try {
      await DocumentPicker.pick({
        presentationStyle: 'pageSheet',
      });

      // setFile(response);
    } catch (err) {
      console.log('catcho', err);
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }

    // setFile(res);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header right="logout" />
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : -300}>
            <UploadComponent
              onPressChooseFile={handlePickerDocument}
              onPressSeeMyFiles={() => {}}
              size={10}
              title="Recordações"
            />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

export default UploadScreen;
