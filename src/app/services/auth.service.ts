import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';
import { NavController } from '@ionic/angular';
import { APP_PATHS } from '../consts/routes';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  sendPasswordResetEmail,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static userSubject = new BehaviorSubject<User | null | 'loading'>(
    'loading'
  );

  constructor(private navCtrl: NavController, private auth: Auth) {}

  async logout() {
    await this.navCtrl.navigateRoot(APP_PATHS.start.root);
  }

  async recoverPassword(email: string) {
    await sendPasswordResetEmail(this.auth, email);
  }

  async login(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async registerUser(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  get currentUser() {
    return this.auth.currentUser;
  }
}
