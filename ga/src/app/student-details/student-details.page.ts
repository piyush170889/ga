import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Utility } from '../core/utility';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.page.html',
  styleUrls: ['./student-details.page.scss'],
})
export class StudentDetailsPage implements OnInit {

  @Input() user: any;
  @Input() doShowDetails: boolean;

  constructor(
    private modalCtrl: ModalController,
    private utlitiy: Utility
  ) { }

  ngOnInit() {
    console.log('users = ' + JSON.stringify(this.user));
    console.log('users = ' + JSON.stringify(this.doShowDetails));
  }

  close() {
    this.modalCtrl.dismiss({});
  }

  diff_years(userDob) {

    let d1: Date = new Date(userDob);
    let d2: Date = new Date();

    return this.utlitiy.diff_years(d1, d2);
  }

  getDownloadLink(saved_file_name) {

    return this.utlitiy.getDownloadLink(saved_file_name, 'ATTC');
  }
}
