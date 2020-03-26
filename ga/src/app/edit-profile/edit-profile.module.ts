import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';


import { EditProfilePageRoutingModule } from './edit-profile-routing.module';

import { EditProfilePage } from './edit-profile.page';
import { EditModalPage } from '../edit-modal/edit-modal.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditProfilePageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditModalPage
      },
     

    ])
  ],
  declarations: [EditProfilePage,EditModalPage]
})
export class EditProfilePageModule {}
