import {AppDocumentInterface} from '~/shared/utils/types/document';
import {
  AppUserCredentialInterface,
  AppUserInterface,
} from '~/shared/utils/types/user';
import firestore from '@react-native-firebase/firestore';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore/lib/index';
import {FirebaseStorageTypes} from '@react-native-firebase/storage';
import SInfo from 'react-native-sensitive-info';
import {LOCAL_STORAGE_SECRET_KEY} from '@env';
export abstract class FirestoreGet {
  private rootPath: string;
  private usersPath: string;

  constructor(rootPath: string, usersPath: string) {
    this.rootPath = rootPath;
    this.usersPath = usersPath;
  }

  protected fetchAllDocumentsByUserID = (
    userID: string,
  ): Promise<FirebaseFirestoreTypes.DocumentSnapshot[]> => {
    return new Promise<FirebaseFirestoreTypes.DocumentSnapshot[]>(
      (resolve, reject) => {
        firestore()
          .collection(`${this.rootPath}/${this.usersPath}/${userID}`)
          .get()
          .then(response => {
            resolve(response.docs);
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

export class FirestoreGetServices extends FirestoreGet {
  constructor() {
    super('drive', 'users');
  }

  async userDocuments(
    userID: string,
  ): Promise<FirebaseFirestoreTypes.DocumentSnapshot[]> {
    const response = await this.fetchAllDocumentsByUserID(userID);
    return response;
  }
}
