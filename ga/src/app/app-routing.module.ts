import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { from } from 'rxjs';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { 
    path: '', 
    // component: LoginComponent, 
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule), 
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
    path: 'photogallery',
    loadChildren: () => import('./photogallery/photogallery.module').then(m => m.PhotogalleryPageModule)
  },
  {
    path: 'student-details',
    loadChildren: () => import('./student-details/student-details.module').then(m => m.StudentDetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
