import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginaltPage } from './loginalt.page';

const routes: Routes = [
  {
    path: '',
    component: LoginaltPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginaltPageRoutingModule {}
