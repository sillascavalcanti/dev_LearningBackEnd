import { inject, injectable } from "tsyringe";
import Event from "../../model/Event";
import { EventRepository } from "../EventRepository";
import * as admin from 'firebase-admin'
import { Firebase } from "../../config/Firestore";

@injectable()
export class EventRepositoryImpl implements EventRepository {
  
  private database: admin.firestore.Firestore;

  constructor(@inject(Firebase) database: Firebase) {
    this.database = database.firestore();
  }
  findById(id: string): Promise<Event> {
    return this.database.collection('event').doc(id).get().then(doc => {
      if(doc.data() === undefined)
        throw new Error("Event not found.");
      return this.snapshotToEvent(doc);
    });
  }

  findAll(): Promise<Event[]> {
    return this.database.collection('event').get().then(snapshot => snapshot.docs.map(this.snapshotToEvent));
  }

  save(event: Event): Promise<Event> {
    return new Promise((resolve, reject) => {
      this.database.collection('event').add({...event}).then((_) => resolve(event)).catch(reject);
    });
  }

  private snapshotToEvent(snapshot: admin.firestore.DocumentSnapshot<admin.firestore.DocumentData, admin.firestore.DocumentData>): Event {
    return new Event(snapshot.id, snapshot.get('createdBy.id'), snapshot.get('createdBy.name'), snapshot.get('title'), snapshot.get('description'), snapshot.get('contact'), snapshot.get('picture'), snapshot.get('date'), snapshot.get('address.street'), snapshot.get('address.number'), snapshot.get('address.complement'), snapshot.get('address.neighborhood'), snapshot.get('address.city'), snapshot.get('address.state'), snapshot.get('address.postalCode'));
  }
  
}