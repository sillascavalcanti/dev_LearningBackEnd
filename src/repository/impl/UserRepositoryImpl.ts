// import database from '../../config/Firestore'
import { Filter } from 'firebase-admin/firestore'
import * as admin from 'firebase-admin'
import User from '../../model/User';
import { UserRepository } from '../UserRepository';
import { injectable, inject } from 'tsyringe';
import { Firebase } from '../../config/Firestore';

@injectable()
export class UserRepositoryImpl implements UserRepository{

  private database: admin.firestore.Firestore;

  constructor(@inject(Firebase) database: Firebase) {
    this.database = database.firestore();
  }

  public save(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this.findByEmailAndDocument(user.email, user.document).then(() => {reject("Already registered email or document.")}).catch(() => {
        this.database.collection('user').add({...user}).then((_) => resolve(user)).catch(reject);
      });
    });
  }
  
  public findByEmailAndDocument(email: string, document: string): Promise<User> {
    let query = this.database.collection('user').where(Filter.or(Filter.where('email', '==', email), Filter.where('document', '==', document))).limit(1);
    return query.get().then(snapshot => {
      let users = snapshot.docs.map(this.snapshotToUser);
      if (users.length === 0)
        throw new Error("User not found.");
      return users[0];
    });
  }


  public findUniqueByEmailAndPassword(email: String, password: String): Promise<User> {
    let query = this.database.collection('user').where(Filter.and(Filter.where('email', '==', email), Filter.where('password', '==', password))).limit(1);
    return query.get().then(snapshot => {
      let users = snapshot.docs.map(this.snapshotToUser);
      if (users.length === 0)
        throw new Error("User not found.");
      return users[0];
    });
  }

  public findById(id: string) {
    return this.database.collection('user').doc(id).get().then(doc => {
      if(doc.data() === undefined)
        throw new Error("User not found.");
      return this.snapshotToUser(doc);
    });
  }

  private snapshotToUser(snapshot: admin.firestore.DocumentSnapshot<admin.firestore.DocumentData, admin.firestore.DocumentData>): User {
    return new User(snapshot.id, snapshot.get('fullname'), snapshot.get('document'), snapshot.get('password'), snapshot.get('phone'), snapshot.get('email'), snapshot.get('address.street'), snapshot.get('address.number'), snapshot.get('address.complement'), snapshot.get('address.neighborhood'), snapshot.get('address.city'), snapshot.get('address.state'), snapshot.get('address.postalCode'));
  }
}