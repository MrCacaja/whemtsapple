import {Routes} from '@angular/router';
import {AppRoute} from "./consts/routes";

export const routes: Routes = [
  {
    path: AppRoute.START,
    loadChildren: () => import('./pages/start/start.module').then((m) => m.StartModule),
  },
  {
    path: AppRoute.MAIN,
    loadChildren: () => import('./pages/main/main.module').then((m) => m.MainModule),
  },
  {
    path: '',
    redirectTo: AppRoute.MAIN,
    pathMatch: 'full',
  }
];
