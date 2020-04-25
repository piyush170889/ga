import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../core/dataservices/data.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ServerUrl } from '../core/constants/server-url';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formGroup: FormGroup;
  attachements: string[] = [];


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService,
    private camera: Camera
  ) {

    this.formGroup = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      dob: ['1990-01-01', Validators.required],
      qualification: ['', Validators.required],
      active: [1, Validators.required],
      mobile1: ['', Validators.required],
      mobile2: ['', Validators.required],
      mobile3: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  registerUser() {

    console.log('registerUser() called');
    console.log(this.formGroup.value);
    console.log('Attachments = ');
    console.log(this.attachements);

    let data: any = this.formGroup.value;
    data['attachments'] = this.attachements;
    console.log('data = ', data);

    this.dataService.post({ url: ServerUrl.REGISTER, data: data, isLoader: true })
      .subscribe(
        (response) => {
          console.log('Response = ' + JSON.stringify(response));
          this.router.navigateByUrl('home');
        },
        (err) => {
          console.log(err);

        }
      )

    // this.router.navigateByUrl('home');
  }

  openGallery() {

    if (this.attachements.length < 5) {
      let cameraOptions: CameraOptions = {
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
        quality: 100,
        targetWidth: 1000,
        targetHeight: 1000,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true
      }

      this.camera.getPicture(cameraOptions)
        .then(
          (data_uri) => {
            console.log(data_uri);
            let base64Image: string = 'data:image/jpeg;base64,' + data_uri;
            this.attachements.push(base64Image);
          },
          (err) => console.log(err));
    } else {
      alert('You can have maximum 5 attachments');
    }
  }

  removeAttachment(i: number) {

    console.log('Index To Remove = ' + i);

    this.attachements.splice(i, 1);
  }
}
