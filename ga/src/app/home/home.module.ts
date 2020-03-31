import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { PhotogalleryPage } from '../photogallery/photogallery.page';
import { StudentDetailsPage } from '../student-details/student-details.page';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { DataService } from '../core/dataservices/data.service';


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
  declarations: [HomePage, PhotogalleryPage, StudentDetailsPage, ToolbarComponent],
  providers: [DataService]
})
export class HomePageModule { }
