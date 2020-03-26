
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Toast } from '@ionic-native/toast/ngx';
import { ToastController } from '@ionic/angular';




@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.page.html',
  styleUrls: ['./edit-modal.page.scss'],
})
export class EditModalPage {


  username: string;
  gender: string;
  DOB: string;
  city: string;
  qualification: string;



  constructor(private modalCtrl: ModalController, public toastController: ToastController) {


  }

  async cancel() {
    const toast = await this.toastController.create({
      message: 'Your Name edit have been cancel.',
      duration: 2000
    });
    toast.present();


    console.log('Closing modal');

    this.modalCtrl.dismiss();
  }

  async save() {

    const toast = await this.toastController.create({
      message: 'Your Name have been saved.',
      duration: 2000
    });
    toast.present();



    console.log('save successful   ' + "username   :" + this.username);
    this.cancel();

  }


}



