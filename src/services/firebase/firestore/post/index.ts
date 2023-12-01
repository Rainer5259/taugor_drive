import {
  DocumentChange,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import {getFirestoreService} from '../../app/firestore/getFirestore';
import {
  FirebaseStorage,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import {FirebaseError} from 'firebase/app';
import {getStorageFirebaseService} from '../../app/storage';
import {AppDocumentInterface} from '~/shared/utils/types/document';
import {AppUserInterface} from '~/shared/utils/types/user';

export abstract class FirestorePost {
  private firestore: Firestore = getFirestoreService;
  private storage: FirebaseStorage = getStorageFirebaseService;
  private rootPath: string;

  constructor(rootPath: string) {
    this.rootPath = rootPath;
  }

  protected addDocumentToStorage = (
    data: Blob,
  ): Promise<DocumentReference<DocumentData, DocumentData>> => {
    return new Promise<DocumentReference<DocumentData, DocumentData>>(
      (resolve, reject) => {
        addDoc(collection(this.firestore, this.rootPath), Object(data))
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error as FirebaseError);
          });
      },
    );
  };

  protected fetchAllDocuments = (): Promise<
    DocumentChange<DocumentData, DocumentData>[]
  > => {
    return new Promise<DocumentChange<DocumentData, DocumentData>[]>(
      (resolve, reject) => {
        getDocs(collection(this.firestore, this.rootPath))
          .then(response => {
            resolve(response.docChanges());
          })
          .catch(error => {
            reject(error as FirebaseError);
          });
      },
    );
  };

  // protected fetchListERDByUserID = (
  //   uid: string,
  // ): Promise<DocumentChange<DocumentData, DocumentData>[]> => {
  //   return new Promise<DocumentChange<DocumentData, DocumentData>[]>(
  //     (resolve, reject) => {
  //       getDocs(
  //         query(
  //           collection(this.firestore, this.rootPath),
  //           where(this.uid, '==', uid),
  //         ),
  //       )
  //         .then(response => {
  //           resolve(response.docChanges());
  //         })
  //         .catch(error => {
  //           reject(error as FirebaseError);
  //         });
  //     },
  //   );
  // };

  /**Fetch document by title */
  protected fetchDocByDocTitle = (docID: string): Promise<DocumentSnapshot> => {
    return new Promise<DocumentSnapshot>((resolve, reject) => {
      getDoc(doc(this.firestore, this.rootPath, docID))
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error as FirebaseError);
        });
    });
  };

  protected updateDocument = (
    docID: string,
    data: AppDocumentInterface,
  ): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      setDoc(doc(this.firestore, this.rootPath, docID), data, {
        merge: true,
      })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error as FirebaseError);
        });
    });
  };

  protected updateHistoryDocument = (
    docID: string,
    data: AppUserInterface,
  ): Promise<AppUserInterface> => {
    return new Promise<AppUserInterface>((resolve, reject) => {
      setDoc(doc(this.firestore, this.rootPath, docID), data)
        .then(() => {
          resolve(data);
        })
        .catch(error => {
          reject(error as FirebaseError);
        });
    });
  };

  protected deleteEmployee = (docID: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      deleteDoc(doc(this.firestore, this.rootPath, docID))
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error as FirebaseError);
        });
    });
  };

  protected uploadFileToStorage = (
    docID: string,
    data: Uint8Array,
  ): Promise<Uint8Array> => {
    return new Promise<Uint8Array>((resolve, reject) => {
      uploadBytes(ref(this.storage, docID), data)
        .then(() => {
          resolve(data);
        })
        .catch(error => {
          reject(error as FirebaseError);
        });
    });
  };
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
