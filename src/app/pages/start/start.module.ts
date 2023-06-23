import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AppRoute} from "../../consts/routes";

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoute.LOGIN,
    pathMatch: 'full'
  },
  {
    path: AppRoute.LOGIN,
    loadComponent: () => import('./login/login.page').then(p => p.LoginPage)
  },
  {
    path: AppRoute.REGISTER,
    loadComponent: () => import('./register/register.page').then(p => p.RegisterPage)
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class StartModule { }
