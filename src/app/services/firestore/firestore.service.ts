import {Injectable, Injector} from '@angular/core';
import {
  Firestore,
  getDocs,
  onSnapshot,
  addDoc,
  setDoc,
  deleteDoc,
  getDoc,
  doc,
  collection,
  CollectionReference, query, limit, orderBy, OrderByDirection,
} from "@angular/fire/firestore";
import {BehaviorSubject, Observable, skip} from "rxjs";
import { BaseDoc } from 'src/app/interfaces/firebase';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService<T extends BaseDoc> {
  protected firestore: Firestore;
  protected collectionRef!: CollectionReference<T>;
  protected static subscriptions: BehaviorSubject<any>[] = [];

  protected constructor(injector: Injector) {
    this.firestore = injector.get(Firestore);
  }

  async getCollectionData(): Promise<T[]> {
    return (await getDocs(this.collectionRef)).docs.map((docRef) => ({...(docRef.data() as any), id: docRef.id})) as any;
  }

  async getDocData(id: string): Promise<T | null> {
    const docRef = await getDoc(this.getDoc(id));
    const docData = docRef.data();
    if (!Object.keys(docData || {}).length) return null;
    return docData ? {...docData, id: docRef.id} as T : null;
  }

  async getLastCollectionData(quantity: number, orderByParam: string, direction: OrderByDirection = 'desc'): Promise<T[]> {
    const q = query(this.collectionRef, orderBy(orderByParam, direction), limit(quantity));
    return (await getDocs(q)).docs.map((docRef) => ({...(docRef.data() as any), id: docRef.id})) as T[];
  }

  async getCollectionDataOrderedBy(orderByParam: string, direction: OrderByDirection = 'desc'): Promise<T[]> {
    const q = query(this.collectionRef, orderBy(orderByParam, direction));
    return (await getDocs(q)).docs.map((docRef) => ({...(docRef.data() as any), id: docRef.id})) as T[];
  }

  getDocData$(id: string) {
    const observable = new BehaviorSubject<T | null>(null);
    onSnapshot(this.getDoc(id), (value) => {
      observable.next({id: value.id, ...value.data()} as any)
    }, (e) => {
      observable.next(e as any);
    });
    FirestoreService.subscriptions.push(observable);
    return observable.pipe(skip(1));
  }

  getCollectionData$(): Observable<T[]> {
    const observable = new BehaviorSubject([]);
    onSnapshot(this.collectionRef, (value: any) =>
      observable.next(value.docs.map((doc: any) =>
        ({...doc.data(), id: doc.id}))
      ));
    FirestoreService.subscriptions.push(observable);
    return observable.pipe(skip(1));
  }

  async deleteDoc(id: string) {
    await deleteDoc(this.getDoc(id));
  }

  async set(data: Partial<T>, merge = true) {
    if (data.id) {
      const {id, ...docData} = data;
      await setDoc(this.getDoc(id), docData, {merge});
      return data;
    } else {
      const docData = await addDoc(this.collectionRef, data as any);
      return {...data, id: docData.id}
    }
  }

  clearSubscriptions() {
    for (const sub of FirestoreService.subscriptions) {
      sub.complete();
      sub.unsubscribe();
    }
    FirestoreService.subscriptions = [];
  }

  generateId() {
    return doc(this.collectionRef).id;
  }

  protected getDoc(id: string) {
    return doc(this.collectionRef, id);
  }

  protected setCollectionRef(name: string) {
    this.collectionRef = collection(this.firestore, name) as CollectionReference<T>;
  }
}
