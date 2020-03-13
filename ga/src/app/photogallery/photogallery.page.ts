import { Component, Input, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-photogallery',
  templateUrl: './photogallery.page.html',
  styleUrls: ['./photogallery.page.scss'],
})
export class PhotogalleryPage implements OnInit {


  @Input() firstName: string;

  // @Input() firstName: string;
  // @Input() lastName: string;
  // @Input() middleInitial: string;
  // modalCtrl: any;

  // constructor(navParams: NavParams) {
  //   // componentProps can also be accessed at construction time using NavParams
  //   console.log(navParams.get('firstName'));
  // }


  constructor(private modalCtrl: ModalController) { }

  close() {
    console.log('Closing modal');

    this.modalCtrl.dismiss();
  }

  ngOnInit() {

  }


}

