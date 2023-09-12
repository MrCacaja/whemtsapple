import {Injectable, Injector} from "@angular/core";
import {FirestoreService} from "./firestore.service";
import {User} from "../../interfaces/user";
import {getDocs, onSnapshot, query, where} from "@angular/fire/firestore";
import {BehaviorSubject, skip} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService extends FirestoreService<User> {

  constructor(injector: Injector) {
    super(injector);
    this.setCollectionRef('users');
  }
}
