import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { StudentDetailsPage } from '../student-details/student-details.page';
import { DataService } from '../core/dataservices/data.service';
import { Utility } from '../core/utility';
import { EditProfilePageModule } from '../edit-profile/edit-profile.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      },
      {
        path: '',
        component: StudentDetailsPage
      }
    ]),
    EditProfilePageModule
  ],
  declarations: [HomePage, StudentDetailsPage],
  providers: [DataService, Utility]
})
export class HomePageModule { }
