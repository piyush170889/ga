import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../core/dataservices/data.service';
import { ServerUrl } from '../core/constants/server-url';
import { ApplicationConstants } from '../core/constants/application-constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  imageSrc: any = 'https://i.stack.imgur.com/l60Hf.png';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService
  ) {

    this.formGroup = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  ngOnInit() { }

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
          alert(JSON.stringify(err));
        }
      );

    // this.router.navigateByUrl('home');
  }

}
