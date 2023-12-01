import {getDownloadURL, ref} from 'firebase/storage';
import {getStorageFirebaseService} from '../../app/storage';
import {FirebaseError} from 'firebase/app';

abstract class StorageGet {
  constructor() {}
  protected getURLFileFromStorage = (docID: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      getDownloadURL(ref(getStorageFirebaseService, docID))
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error as FirebaseError);
        });
    });
  };
}

export class StorageGetService extends StorageGet {
  constructor() {
    super();
  }

  async downloadFileWithID(docID: string) {
    const response = await this.getURLFileFromStorage(docID);
    return response;
  }
}
