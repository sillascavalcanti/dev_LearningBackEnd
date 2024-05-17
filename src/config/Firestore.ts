import * as admin from 'firebase-admin'
import ServiceAccount from './ServiceAccount';
import { singleton } from 'tsyringe';

@singleton()
export class Firebase {

  private database: admin.app.App;

  constructor() {
    this.database = admin.initializeApp({
      credential: admin.credential.cert(ServiceAccount as admin.ServiceAccount),
      databaseURL: process.env.DATABASEURL
    });
  }

  public firestore(): admin.firestore.Firestore{
    return this.database.firestore();
  }
}