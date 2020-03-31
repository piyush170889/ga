import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotogalleryPage } from '../photogallery/photogallery.page';
import { StudentDetailsPage } from '../student-details/student-details.page';
import { DataService } from '../core/dataservices/data.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  modalCtrl: any;
  doClearLocalStorage: boolean = false;
  users: any[] = [];
  usersOrg: any[] = [];
  term: string = '';

  constructor(
    private modalController: ModalController,
    private dataService: DataService
  ) {

    if (this.doClearLocalStorage)
      localStorage.clear();

    this.users = this.populateDummmyUsersData();
    this.usersOrg = this.populateDummmyUsersData();

    // const fetchUserUrl: string = 'users';
    // this.dataService.get({ url: fetchUserUrl, isLoader: true })
    //   .subscribe(
    //     (response: any) => {
    //       console.log('Response = ' + JSON.stringify(response));
    //       this.users = response;
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
  }

  populateDummmyUsersData() {

    return [{
      name: 'John Doe 1',
      qual: 'MSC(CS)',
      city: 'Nasik',
      age: '22',
      img: '/assets/images/user.png',
      img1: '/assets/images/user.png',
      img2: '/assets/images/user.png',
      mone: '9096409749'
    }, {
      name: 'John Doe 2',
      qual: 'BE(CS)',
      city: 'Pune',
      age: '22',
      img: '/assets/images/user.png',
      img1: '/assets/images/user.png',
      img2: '/assets/images/user.png',
      mone: '9096409749'
    }, {
      name: 'John Doe 3',
      qual: 'BE(IT)',
      city: 'Mumbai',
      age: '24',
      img: '/assets/images/user.png',
      img1: '/assets/images/user.png',
      img2: '/assets/images/user.png',
      mone: '9096409749'
    }]
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
            (user.name.toLowerCase().indexOf(compareTerm) > -1)
            || (user.qual.toLowerCase().indexOf(compareTerm) > -1)
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