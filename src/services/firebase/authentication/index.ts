export abstract class Authentication {
  protected signInWithEmailAndPassword = (
    email: string,
    password: string,
  ): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
      signInWithEmailAndPassword(authenticationService, email, password)
        .then((userCredential: UserCredential) => {
          resolve(userCredential.user);
        })
        .catch((error: FirebaseError) => {
          reject(error);
        });
    });
  };

  protected signUpWithEmailAndPassword = (
    email: string,
    password: string,
  ): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
      createUserWithEmailAndPassword(authenticationService, email, password)
        .then((userCredential: UserCredential) => {
          resolve(userCredential.user);
        })
        .catch(error => {
          reject(error as FirebaseError);
        });
    });
  };
}
