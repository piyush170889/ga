import { Component, OnInit } from '@angular/core';
import { EditModalPage } from '../edit-modal/edit-modal.page';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage {

  modalCtrl: any;
  image: any;
  router: any;
  id: string;
  name: string;
  city: string;
  phone: number;


  departments = [{ "id": 1, "title": "Name", "name": "Farin" },
  { "id": 2, "title": "Gender", "name": "Female" },
  { "id": 3, "title": "Birth Date", "name": "22 Aug 1996" },
  { "id": 4, "title": "City", "name": "Nasik" },
  { "id": 5, "title": "Qualification", "name": "MSC(cs)" },
  { "id": 6, "title": "Phone", "name": "9568452365" }]

  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };


  constructor(public modalController: ModalController, private route: ActivatedRoute,
    private camera: Camera, public actionSheetCtrl: ActionSheetController, private file: File) { }


  async editDetailsModal() {
    const modal = await this.modalController.create({
      component: EditModalPage,
      componentProps: {
        'firstName': 'Farin',
        'lastName': 'Shaikh',
        'middleInitial': 'S'


      }

    });

    await modal.present();
    modal.onDidDismiss()

  }


  passId(id) {
    console.log("id", id);
  }



  openCam(sourceType) {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {

      this.image = (<any>window).Ionic.WebView.convertFileSrc(imageData);
    }, (err) => {

      alert("error " + JSON.stringify(err))
    });

  }




  async opencameraeditmodal() {
    const actionSheet = await this.actionSheetCtrl.create({

      buttons: [

        {
          text: 'Remove  photo',
          icon: 'archive',
          role: 'destructive',
          handler: () => {
            console.log('remove clicked');
          }
        },
        {
          text: 'Gallery',
          icon: 'images',
          handler: () => {
            this.openCam(this.camera.PictureSourceType.PHOTOLIBRARY);

            console.log('Gallery clicked');
          }
        },
        {
          text: 'Camera',
          icon: 'camera',
          role: 'action',
          handler: () => {
            this.openCam(this.camera.PictureSourceType.CAMERA);
            console.log('camera clicked');
          }

        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }


}
