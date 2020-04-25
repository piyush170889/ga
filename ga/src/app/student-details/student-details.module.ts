import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentDetailsPageRoutingModule } from './student-details-routing.module';

import { StudentDetailsPage } from './student-details.page';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { Utility } from '../core/utility';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentDetailsPageRoutingModule
  ],
  providers: [Utility],
  declarations: [StudentDetailsPage, ToolbarComponent]
})
export class StudentDetailsPageModule { }
