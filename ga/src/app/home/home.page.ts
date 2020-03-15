import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotogalleryPage } from '../photogallery/photogallery.page';
import { StudentDetailsPage } from '../student-details/student-details.page';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  modalCtrl: any;
  doClearLocalStorage: boolean = false;

  constructor(public modalController: ModalController) {

    if (this.doClearLocalStorage)
      localStorage.clear();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: PhotogalleryPage,
      componentProps: {
        'firstName': 'Farin',
        'lastName': 'Shaikh',
        'middleInitial': 'S'
      }
    });

    await modal.present();
    modal.onDidDismiss()
      .then(res => alert(JSON.stringify(res)))
  }

  async StudentDetailsModal() {
  
    const modal = await this.modalController.create({
      component: StudentDetailsPage,
      componentProps: {
      }
    });

    await modal.present();
    modal.onDidDismiss()
      .then(res => alert(JSON.stringify(res)))
  }

}