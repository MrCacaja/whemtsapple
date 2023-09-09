import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthService} from "../services/auth.service";
import {NavController} from "@ionic/angular";
import {APP_PATHS} from "../consts/routes";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authSrvc: AuthService, private navCtrl: NavController) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    console.log(this.authSrvc.currentUser)
    const isLoggedIn = !!this.authSrvc.currentUser;
    if (!isLoggedIn) {
      this.navCtrl.navigateRoot(APP_PATHS.start.root);
    }
    return isLoggedIn;
  }

}
