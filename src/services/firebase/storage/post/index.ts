import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
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
          reject(error as FirebaseStorageTypes.Module);
        });
    });
  };

  protected deleteUserFiles = (userID: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      storage()
        .ref(`${this.rootPath}/${userID}`)
        .delete()
        .then(() => {})
        .catch(error => {
          reject(error);
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

  async deleteAllFiles(userID: string): Promise<void> {
    const response = await this.deleteUserFiles(userID);
    return response;
  }
}
