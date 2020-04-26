import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StudentDetailsPage } from '../student-details/student-details.page';
import { DataService } from '../core/dataservices/data.service';
import { ServerUrl } from '../core/constants/server-url';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  modalCtrl: any;
  users: any[] = [];
  usersOrg: any[] = [];
  term: string = '';
  
    constructor(
      private modalController: ModalController,
      private dataService: DataService
    ) {

    this.dataService.get({ url: ServerUrl.USERS, isLoader: true })
      .subscribe(
        (response: any) => {
          console.log('User Listing = ', response);

          this.users = response.data;
          this.usersOrg = response.data;
        }
      );
  }


  async presentModal(user: any) {

    const modal = await this.modalController.create({
      component: StudentDetailsPage,
      componentProps: {
        doShowDetails: false,
        user: user
      }
    });

    await modal.present();
    modal.onDidDismiss()
      .then(res => console.log(JSON.stringify(res)))
  }

  async studentDetailsModal(user) {

    const modal = await this.modalController.create({
      component: StudentDetailsPage,
      componentProps: {
        doShowDetails: true,
        user: user
      }
    });

    await modal.present();
    modal.onDidDismiss()
      .then(res => console.log(JSON.stringify(res)))
  }


  searchUser() {

    console.log('searchUser() called');

    // this.users = null;
    console.log('term = ' + this.term);

    if (this.term.trim() != '') {
      let compareTerm = this.term.toLowerCase();
      this.users = this.usersOrg.filter(
        (user: any) => {
          if (
            (user.first_name.toLowerCase().indexOf(compareTerm) > -1)
            || (user.last_name.toLowerCase().indexOf(compareTerm) > -1)
            || (user.qualification.toLowerCase().indexOf(compareTerm) > -1)
            || (user.city.toLowerCase().indexOf(compareTerm) > -1))
            return true;
        }
      );
      console.log('Filtered Users. users = ' + JSON.stringify(this.users));

    } else {
      this.users = Object.assign([], this.usersOrg);
    }
  }


}