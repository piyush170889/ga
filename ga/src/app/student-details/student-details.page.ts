import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.page.html',
  styleUrls: ['./student-details.page.scss'],
})
export class StudentDetailsPage implements OnInit {

  @Input() user: any;
  @Input() doShowDetails: boolean;
  
  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log('users = ' + JSON.stringify(this.user));
    console.log('users = ' + JSON.stringify(this.doShowDetails));
  }

  close() {
    this.modalCtrl.dismiss({});
  }
}
