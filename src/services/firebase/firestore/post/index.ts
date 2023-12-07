import {AppDocumentInterface} from '~/shared/utils/types/document';
import firestore from '@react-native-firebase/firestore';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore/lib/index';
import {FirebaseStorageTypes} from '@react-native-firebase/storage';
export abstract class FirestorePost {
  private rootPath: string;
  private usersPath: string;

  constructor(rootPath: string, usersPath: string) {
    this.rootPath = rootPath;
    this.usersPath = usersPath;

    //  await SInfo.getItem(LOCAL_STORAGE_SECRET_KEY, {}).then(
    //       (storagedUser: string) => {
    //         const userParsed: AppUserCredentialInterface =
    //           JSON.parse(storagedUser);
    //         this.userID = userParsed.id;
    //       },
    //     );
    //   }
  }

  protected addDocument = async (
    userID: string,
    data: AppDocumentInterface,
    folderID?: string,
  ): Promise<FirebaseFirestoreTypes.DocumentData | void> => {
    const endpoint = `${this.rootPath}/${this.usersPath}/${userID}`;
    const endpointFolder = `${endpoint}/${folderID}`;

    if (folderID === '' || folderID === undefined) {
      return new Promise<FirebaseFirestoreTypes.DocumentData>(
        async (resolve, reject) => {
          console.log('enviou');
          await firestore()
            .collection(endpoint)
            .add(data)
            .then(response => resolve(response))
            .catch(error => {
              console.log('reject');
              reject(error as FirebaseStorageTypes.Module);
            });
        },
      );
    } else if (folderID) {
      return new Promise<void>(async (resolve, reject) => {
        await firestore()
          .doc(endpointFolder)
          .update({folder: firestore.FieldValue.arrayUnion(data)})
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log('reject');
            reject(error as FirebaseStorageTypes.Module);
          });

        console.log('postou');
      });
    }
  };

  protected createEmptyDocument = (
    userID: string,
    title: string,
  ): Promise<FirebaseFirestoreTypes.DocumentData> => {
    return new Promise<FirebaseFirestoreTypes.DocumentData>(
      (resolve, reject) => {
        firestore()
          .collection(`${this.rootPath}/${this.usersPath}/${userID}`)
          .add({folder: [{title}]})
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error as typeof FirebaseStorageTypes);
          });
      },
    );
  };

  protected fetchAllDocumentsByUserID = (
    userID: string,
  ): Promise<FirebaseFirestoreTypes.DocumentData> => {
    return new Promise<FirebaseFirestoreTypes.DocumentData>(
      (resolve, reject) => {
        firestore()
          .collection(`${this.rootPath}/${this.usersPath}/${userID}`)
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
    folderID?: string,
  ) {
    const response = await this.addDocument(userID, data, folderID);
    return response;
  }

  async createFolder(userID: string, folderName: string) {
    const response = await this.createEmptyDocument(userID, folderName);
    return response;
  }

  async userDocuments(userID: string) {
    const response = await this.fetchAllDocumentsByUserID(userID);
    return response;
  }
}
