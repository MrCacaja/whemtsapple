import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AppRoute} from "../../consts/routes";

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoute.CHAT_LIST,
    pathMatch: 'full'
  },
  {
    path: AppRoute.CHAT_LIST,
    loadComponent: () => import('./chat-list/chat-list.page').then(p => p.ChatListPage)
  },
  {
    path: `${AppRoute.CHAT}/:id`,
    loadComponent: () => import('./chat/chat.page').then(p => p.ChatPage)
  },
  {
    path: `${AppRoute.PROFILE}/:id`,
    loadComponent: () => import('./profile/profile.page').then(p => p.ProfilePage)
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MainModule { }
