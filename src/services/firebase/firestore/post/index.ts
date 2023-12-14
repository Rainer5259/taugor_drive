import {AppDocumentInterface} from '~/shared/utils/types/document';
import firestore from '@react-native-firebase/firestore';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore/lib/index';
import {FirebaseStorageTypes} from '@react-native-firebase/storage';
export abstract class FirestorePost {
  private rootPath: string;
  private usersPath: string;
  private usersEndpoint: string;

  constructor(rootPath: string, usersPath: string) {
    this.rootPath = rootPath;
    this.usersPath = usersPath;
    this.usersEndpoint = `${this.rootPath}/${this.usersPath}`;
  }

  protected addDocument = async (
    userID: string,
    data: AppDocumentInterface,
    folderID: string | null,
  ): Promise<FirebaseFirestoreTypes.DocumentData | void> => {
    const userIDEndpoint = `${this.usersEndpoint}/${userID}`;
    const endpointFolder = `${userIDEndpoint}/${folderID}`;

    if (folderID === '' || folderID === undefined || folderID === null) {
      return new Promise<FirebaseFirestoreTypes.DocumentData>(
        async (resolve, reject) => {
          await firestore()
            .collection(userIDEndpoint)
            .add(data)
            .then(response => resolve(response))
            .catch(error => reject(error as FirebaseStorageTypes.Module));
        },
      );
    } else if (folderID) {
      return new Promise<void>(async (resolve, reject) => {
        await firestore()
          .doc(endpointFolder)
          .update({folder: firestore.FieldValue.arrayUnion(data)})
          .then(response => resolve(response))
          .catch(error => reject(error as FirebaseStorageTypes.Module));
      });
    }
  };

  protected createEmptyDocument = (
    userID: string,
    folderTitle: string,
  ): Promise<FirebaseFirestoreTypes.DocumentData> => {
    return new Promise<FirebaseFirestoreTypes.DocumentData>(
      (resolve, reject) => {
        firestore()
          .collection(`${this.usersEndpoint}/${userID}`)
          .add({folder: [], folderTitle, isFolder: true})
          .then(response => resolve(response))
          .catch(error => reject(error as typeof FirebaseStorageTypes));
      },
    );
  };

  protected fetchAllDocumentsByUserID = (
    userID: string,
  ): Promise<FirebaseFirestoreTypes.DocumentData> => {
    return new Promise<FirebaseFirestoreTypes.DocumentData>(
      (resolve, reject) => {
        firestore()
          .collection(`${this.usersEndpoint}/${userID}`)
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
    super('drive', 'users');
  }

  async sendDocument(
    userID: string,
    data: AppDocumentInterface,
    folderID: string | null,
  ): Promise<FirebaseFirestoreTypes.DocumentData | void> {
    const response = await this.addDocument(userID, data, folderID);
    return response;
  }

  async createFolder(
    userID: string,
    folderName: string,
  ): Promise<FirebaseFirestoreTypes.DocumentData> {
    const response = await this.createEmptyDocument(userID, folderName);
    return response;
  }

  async userDocuments(
    userID: string,
  ): Promise<FirebaseFirestoreTypes.DocumentData> {
    const response = await this.fetchAllDocumentsByUserID(userID);
    return response;
  }
}
