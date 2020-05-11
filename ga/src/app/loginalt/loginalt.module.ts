import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginaltPageRoutingModule } from './loginalt-routing.module';

import { LoginaltPage } from './loginalt.page';
import { Utility } from '../core/utility';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginaltPageRoutingModule
  ],
  declarations: [LoginaltPage],
  providers: [Utility]
})
export class LoginaltPageModule { }
