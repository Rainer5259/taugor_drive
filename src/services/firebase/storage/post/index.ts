import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import {getStorageFirebaseService} from '../../app/storage';
import {FirebaseError} from 'firebase/app';
import {push, set, ref as databaseRef, Database} from 'firebase/database';
import {databaseFirebaseService} from '../../app/database';
import {uploadBytes} from 'firebase/storage';
abstract class StoragePost {
  // private database: Database = databaseFirebaseService;
  private rootPath: string;
  constructor(rootPath: string) {
    this.rootPath = rootPath;
  }

  protected uploadFileToStorage = (
    userID: string,
    data: string,
  ): Promise<string> => {
    // const databaseReference = database().ref('');
    // const fileRef = push(databaseReference.);
    storage;
    return new Promise<string>((resolve, reject) => {
      storage()
        .ref(`${this.rootPath}/${userID}`)
        .putFile(data)
        .then(() => {
          console.log('Upload', data);
          resolve(data);
        })
        .catch(error => {
          console.log('error no api', error);
          reject(error as FirebaseError);
        });
    });
  };
}

export class StoragePostServices extends StoragePost {
  constructor() {
    super('drive');
  }

  async uploadFile(userID: string, data: string) {
    const response = await this.uploadFileToStorage(userID, data);
    console.log(response);
    return response;
  }
}
