import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth-guard/auth-guard.service';

const routes: Routes = [
  { path: 'parents', loadChildren: () => import('./modules/parents/parents.module').then(m => m.ParentsModule),canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),canActivate: [AuthGuard] },
  { path: '', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
