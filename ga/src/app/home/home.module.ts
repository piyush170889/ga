import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { PhotogalleryPage } from '../photogallery/photogallery.page';
import { StudentDetailsPage } from '../student-details/student-details.page';


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
        component: PhotogalleryPage
      },
      {
        path: '',
        component: StudentDetailsPage
      },

    ])
  ],
  declarations: [HomePage, PhotogalleryPage, StudentDetailsPage]
})
export class HomePageModule { }
