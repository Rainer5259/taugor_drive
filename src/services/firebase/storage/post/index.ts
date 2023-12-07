import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import {FirebaseError} from 'firebase/app';
import {push, set, ref as databaseRef, Database} from 'firebase/database';
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
  ): Promise<FirebaseStorageTypes.TaskSnapshot> => {
    const fileRef = database().ref().push().key;

    return new Promise<FirebaseStorageTypes.TaskSnapshot>((resolve, reject) => {
      storage()
        .ref(`${this.rootPath}/${userID}/${fileRef}`)
        .putFile(data)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          console.log('error no api', error);
          reject(error as FirebaseStorageTypes.Module);
        });
    });
  };
}

export class StoragePostServices extends StoragePost {
  constructor() {
    super('drive');
  }

  async uploadFile(
    userID: string,
    data: string,
  ): Promise<FirebaseStorageTypes.TaskSnapshot> {
    const response = await this.uploadFileToStorage(userID, data);
    return response;
  }
}
