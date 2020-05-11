import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../core/dataservices/data.service';
import { ServerUrl } from '../core/constants/server-url';
import { ApplicationConstants } from '../core/constants/application-constants';
import { Utility } from '../core/utility';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-loginalt',
  templateUrl: './loginalt.page.html',
  styleUrls: ['./loginalt.page.scss'],
})
export class LoginaltPage implements OnInit {

  formGroup: FormGroup;
  user: any = {};
  isFingerPrintAvailable: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService,
    private utility: Utility,
    //private faio: FingerprintAIO
  ) {

    // let fingetPrintOptions: FingerprintOptions = {
    //   disableBackup: true,  //Only for Android(optional)
    // };

    // this.faio.isAvailable()
    //   .then((result: any) => {

    //     console.log('result = ', result);

    //     this.isFingerPrintAvailable = true;

    //     this.faio.show(fingetPrintOptions)
    //       .then((result: any) => console.log(result))
    //       .catch((error: any) => console.log(error));
    //   })
    //   .catch((error: any) => {
    //     this.isFingerPrintAvailable = false;
    //   });

    this.user = JSON.parse(localStorage.getItem(ApplicationConstants.LS_USER_INFO));
    console.log('userInfo = ', this.user);

    this.formGroup = this.fb.group(
      {
        username: [this.user.mobile1, Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  ngOnInit() {
  }

  login() {

    console.log('login() called.');

    console.log(this.formGroup.value);

    const loginUrl: string = ServerUrl.LOGIN;
    this.dataService.post({ url: loginUrl, data: this.formGroup.value, isLoader: true })
      .subscribe(
        (response: any) => {
          console.log('Response = ' + JSON.stringify(response));

          let res: any = JSON.parse(JSON.stringify(response));
          console.log('res = ', res);

          if (res.responseMessage.status == 200) {
            // Store User Info in localstorage
            console.log('userInfo = ', response.response);

            localStorage.setItem(ApplicationConstants.LS_USER_INFO, JSON.stringify(response.response));

            this.router.navigateByUrl('home');
          } else {
            alert(res.responseMessage.message);
          }
        },
        (err) => {
          console.log(err);

        }
      );

    // this.router.navigateByUrl('home');
  }


  updateProfile() {

    console.log('updateProfile()');

    this.router.navigateByUrl('home/edit-user');
  }

  getDownloadLink(saved_file_name) {

    return this.utility.getDownloadLink(saved_file_name, 'PR');
  }

  logoutUser() {

    console.log('logoutUser()');

    this.router.navigateByUrl('logout');
  }

  openTnc() {

    console.log('openTnc()');
    this.router.navigateByUrl('tnc');
  }
}
