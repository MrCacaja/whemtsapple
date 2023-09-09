import {Routes} from '@angular/router';
import {AppRoute} from "./consts/routes";
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: AppRoute.START,
    loadChildren: () => import('./pages/start/start.module').then((m) => m.StartModule),
  },
  {
    path: AppRoute.MAIN,
    loadChildren: () => import('./pages/main/main.module').then((m) => m.MainModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: AppRoute.MAIN,
    pathMatch: 'full',
  }
];
