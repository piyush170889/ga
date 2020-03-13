import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.page.html',
  styleUrls: ['./student-details.page.scss'],
})
export class StudentDetailsPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }
  close() {

    this.modalCtrl.dismiss({

    });
  }


  ngOnInit() {
  }

}
