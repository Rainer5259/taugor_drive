import firestore from '@react-native-firebase/firestore';
import {FirebaseStorageTypes} from '@react-native-firebase/storage';
import {
  AppDocumentInterface,
  AppFolderDocumentInterface,
  IFirebaseDocChangeData,
} from '~/shared/utils/types/document';

export abstract class FirestoreGet {
  private rootPath: string;
  private usersPath: string;

  constructor(rootPath: string, usersPath: string) {
    this.rootPath = rootPath;
    this.usersPath = usersPath;
  }

  protected fetchAllDocumentsByUserID = (
    userID: string,
  ): Promise<AppDocumentInterface[]> => {
    return new Promise<AppDocumentInterface[]>((resolve, reject) => {
      firestore()
        .collection(`${this.rootPath}/${this.usersPath}/${userID}`)
        .get()
        .then(response => {
          const documents = response
            .docChanges()
            .map(doc => doc.doc.data()) as AppDocumentInterface[];
          resolve(documents);
        })
        .catch(error => {
          reject(error as FirebaseStorageTypes.Reference);
        });
    });
  };

  protected fetchAllFoldersByUserID = (
    userID: string,
  ): Promise<IFirebaseDocChangeData[]> => {
    return new Promise<IFirebaseDocChangeData[]>((resolve, reject) => {
      firestore()
        .collection(`${this.rootPath}/${this.usersPath}/${userID}`)
        .get()
        .then(response => {
          const folders = response.docChanges().map(doc => doc.doc);
          resolve(folders);
        })
        .catch(error => {
          reject(error as FirebaseStorageTypes.Reference);
        });
    });
  };

  protected fetchDocumentsByFolderID = (
    userID: string,
    folderID: string,
  ): Promise<AppDocumentInterface[]> => {
    return new Promise<AppDocumentInterface[]>((resolve, reject) => {
      firestore()
        .collection(`${this.rootPath}/${this.usersPath}/${userID}`)
        .doc(`${folderID}`)
        .get()
        .then(response => {
          const documents = response.data()?.folder as AppDocumentInterface[];

          resolve(documents);
        })
        .catch(error => {
          reject(error as FirebaseStorageTypes.Reference);
        });
    });
  };

  protected fetchFolderByID = (
    userID: string,
    folderID: string,
  ): Promise<AppFolderDocumentInterface> => {
    return new Promise<AppFolderDocumentInterface>((resolve, reject) => {
      firestore()
        .collection(`${this.rootPath}/${this.usersPath}/${userID}`)
        .doc(`${folderID}`)
        .get()
        .then(response => {
          const document = response.data() as AppFolderDocumentInterface;
          resolve(document);
        })
        .catch(error => {
          reject(error as FirebaseStorageTypes.Reference);
        });
    });
  };

  protected searchDocumentWithQuery = (
    userID: string,
    q: string,
  ): Promise<AppDocumentInterface[]> => {
    return new Promise<AppDocumentInterface[]>(async (resolve, reject) => {
      firestore()
        .collection(`${this.rootPath}/${this.usersPath}/${userID}`)
        .where('searchName', '>=', q)
        .where('searchName', '<=', q + '\uf8ff')
        .get()
        .then(response => {
          const copyResponse = response;
          const rootFilesData = copyResponse.docs.map(doc =>
            doc.data() !== doc.data()?.folder ? doc.data() : [],
          );

          const allFiles = [...rootFilesData] as AppDocumentInterface[];

          resolve(allFiles);
        })
        .catch(error => reject(error));
    });
  };
}

export class FirestoreGetServices extends FirestoreGet {
  constructor() {
    super('drive', 'users');
  }

  async userDocuments(userID: string): Promise<AppDocumentInterface[]> {
    const response = await this.fetchAllDocumentsByUserID(userID);
    return response;
  }

  async userFolders(userID: string): Promise<IFirebaseDocChangeData[]> {
    const response = await this.fetchAllFoldersByUserID(userID);
    return response;
  }

  async documentByFolderID(
    userID: string,
    folderID: string,
  ): Promise<AppDocumentInterface[]> {
    const response = await this.fetchDocumentsByFolderID(userID, folderID);
    return response;
  }

  async folderByID(
    userID: string,
    folderID: string,
  ): Promise<AppFolderDocumentInterface> {
    const response = await this.fetchFolderByID(userID, folderID);
    return response;
  }

  async searchDocument(
    userID: string,
    q: string,
  ): Promise<AppDocumentInterface[]> {
    const response = await this.searchDocumentWithQuery(userID, q);
    return response;
  }
}
