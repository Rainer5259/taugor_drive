import {FirebaseStorage, ref, uploadBytes} from 'firebase/storage';
import {getStorageFirebaseService} from '../../app/storage';
import {FirebaseError} from 'firebase/app';

abstract class StoragePost {
  private storage: FirebaseStorage = getStorageFirebaseService;
  private rootPath: string;
  constructor(rootPath: string) {
    this.rootPath = rootPath;
  }

  protected uploadFileToStorage = (
    userID: string,
    data: Blob,
  ): Promise<Blob> => {
    return new Promise<Blob>((resolve, reject) => {
      console.log('userID', userID);
      uploadBytes(ref(this.storage, `${this.rootPath}/${userID}`), data)
        .then(() => {
          resolve(data);
        })
        .catch(error => {
          reject(error as FirebaseError);
        });
    });
  };
}

export class StoragePostServices extends StoragePost {
  constructor() {
    super('drive');
  }

  async uploadFile(userID: string, data: Blob) {
    const response = await this.uploadFileToStorage(userID, data);
    return response;
  }
}
