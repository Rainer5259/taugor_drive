import {AppDocumentInterface} from '~/shared/utils/types/document';
import {AppUserInterface} from '~/shared/utils/types/user';
import firestore from '@react-native-firebase/firestore';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore/lib/index';
import {FirebaseStorageTypes} from '@react-native-firebase/storage';
export abstract class FirestorePost {
  private rootPath: string;

  constructor(rootPath: string) {
    this.rootPath = rootPath;
  }

  protected addDocumentToStorage = (data: Blob): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      firestore()
        .doc(this.rootPath)
        .set(Object(data))
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error as typeof FirebaseStorageTypes);
        });
    });
  };

  protected fetchAllDocumentsByUserID = (
    userID: string,
  ): Promise<FirebaseFirestoreTypes.DocumentSnapshot> => {
    return new Promise<FirebaseFirestoreTypes.DocumentSnapshot>(
      (resolve, reject) => {
        firestore()
          .doc(`${this.rootPath}/${userID}`)
          .get()
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error as FirebaseStorageTypes.Reference);
          });
      },
    );
  };

  /**Fetch document by title */
  // protected fetchDocByDocTitle = (
  //   userID: string,
  //   docID: string,
  // ): Promise<AppDocumentInterface> => {
  //   return new Promise<AppDocumentInterface>((resolve, reject) => {
  //     firestore()
  //       .doc(`${this.rootPath}/${userID}`)
  //       .get()
  //       .then(response => {
  //         const doc = response.data as AppDocumentInterface;

  //         resolve(doc);
  //       })
  //       .catch(error => {
  //         reject(error as FirebaseStorageTypes.Reference);
  //       });
  //   });
  // };
}

export class FirestorePostServices extends FirestorePost {
  constructor() {
    super('drive');
  }

  async sendDocument(data: Blob) {
    const response = await this.addDocumentToStorage(data);
    return response;
  }
}
