import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    // loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule), 
  },
  {
    path: 'loginalt',
    loadChildren: () => import('./loginalt/loginalt.module').then(m => m.LoginaltPageModule),
  },
  {
    path: 'logout',
    component: LogoutComponent,
    // loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule), 
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'home/edit-user',
    loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
  },
  {
    path: 'loginalt',
    loadChildren: () => import('./loginalt/loginalt.module').then(m => m.LoginaltPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
