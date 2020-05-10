import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../core/dataservices/data.service';
import { ServerUrl } from '../core/constants/server-url';
import { Utility } from '../core/utility';
import { ApplicationConstants } from '../core/constants/application-constants';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formGroup: FormGroup;
  attachements: string[] = [];
  profileImage: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService,
    private utility: Utility
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

  async registerUser() {

    console.log('registerUser() called');
    console.log(this.formGroup.value);
    console.log('Attachments = ');
    console.log(this.attachements);

    let data: any = this.formGroup.value;
    console.log('Captured Data = ', data);

    let dataKeys: string[] = Object.keys(data);
    console.log('dataKeys = ', dataKeys);

    var fd = new FormData();
    dataKeys.forEach(
      (key) => {
        console.log('Key = ', key);
        console.log('Value = ', data[key]);

        fd.append(key, data[key]);
      }
    )

    this.attachements.forEach(
      (attach) => {
        fd.append('attachments[]',
          new Blob([this.utility.convertBase64ToArrayBuffer(attach)]));
      }
    );

    fd.append('profileImg', this.profileImage);

    let registerApiEndpoint: string = ServerUrl.MAIN + ServerUrl.REGISTER;
    console.log('registerApiEndpoint = ', registerApiEndpoint);

    console.log('Register Data = ', fd);

    let isUploaded: boolean = await this.utility.uploadFormData(registerApiEndpoint, fd);

    if (isUploaded) {

      const loginUrl: string = ServerUrl.LOGIN;

      const loginData = {
        username: data.mobile1,
        password: data.password
      };
      console.log('loginData = ', loginData);

      this.dataService.post({ url: loginUrl, data: loginData, isLoader: true })
        .subscribe(
          (response: any) => {
            console.log('response. = ', response);

            // Store User Info in localstorage
            console.log('userInfo = ', response.response);

            localStorage.setItem(ApplicationConstants.LS_USER_INFO, JSON.stringify(response.response));

            this.router.navigateByUrl('home');
          },
          (err) => {
            console.log(err);

          }
        );
    }
  }

  async openGallery() {

    console.log('openGallery called');
    this.attachements = await this.utility.openGallery(this.attachements);
  }

  async openGalleryProfile() {

    console.log('openGallery called');
    let profileImageAttc: any[] = await this.utility.openGallery([])[0];
    if (profileImageAttc && profileImageAttc.length > 0)
      this.profileImage = profileImageAttc[0];
  }

  removeAttachment(i: number) {

    console.log('Index To Remove = ' + i);

    this.attachements.splice(i, 1);
  }

  removeAttachmentProfile() {

    this.profileImage = '';
  }
}
