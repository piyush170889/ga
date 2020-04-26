import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EditProfilePageRoutingModule } from './edit-profile-routing.module';
import { EditProfilePage } from './edit-profile.page';
import { Utility } from '../core/utility';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditProfilePageRoutingModule
  ],
  declarations: [EditProfilePage, ToolbarComponent],
  exports: [ToolbarComponent],
  providers: [Utility]
})
export class EditProfilePageModule { }
