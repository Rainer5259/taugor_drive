import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';
abstract class StorageGet {
  private rootPath: string;

  constructor(rootPath: string) {
    this.rootPath = rootPath;
  }

  protected getAllFilesByUserID = (
    userID: string,
  ): Promise<FirebaseStorageTypes.ListResult> => {
    return new Promise<FirebaseStorageTypes.ListResult>((resolve, reject) => {
      storage()
        .ref(`${this.rootPath}/${userID}`)
        .listAll()
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  protected getTotalBytesByUserID = async (userID: string): Promise<number> => {
    const files = await this.getAllFilesByUserID(userID);

    let totalBytes = 0;
    const metadataPromises = files.items.map(file => {
      return storage().ref(file.fullPath).getMetadata();
    });

    const metadataResults = await Promise.all(metadataPromises);

    metadataResults.forEach(response => {
      totalBytes += response.size;
    });

    return new Promise<number>((resolve, reject) => {
      resolve(totalBytes);
    });
  };
}

export class StorageGetServices extends StorageGet {
  constructor() {
    super('drive');
  }

  async getAllFiles(userID: string): Promise<FirebaseStorageTypes.ListResult> {
    const response = await this.getAllFilesByUserID(userID);
    return response;
  }

  async getMetadataByUserID(userID: string): Promise<number> {
    const response = await this.getTotalBytesByUserID(userID);
    return response;
  }
}
