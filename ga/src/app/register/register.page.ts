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

          const loginUrl: string = ServerUrl.LOGIN;
          const loginData = {
            mobile: data.mobile1,
            password: data.password
          };

          this.dataService.post({ url: loginUrl, data: loginData, isLoader: true })
            .subscribe(
              (response: any) => {
                console.log('Response = ' + JSON.stringify(response));

                // Store Token in localstorage
                localStorage.setItem(ApplicationConstants.KEY_TOKEN, response.token);

                this.router.navigateByUrl('home');
              },
              (err) => {
                console.log(err);

              }
            );
        },
        (err) => {
          console.log(err);

        }
      )

    // this.router.navigateByUrl('home');
  }

  async openGallery() {

    console.log('openGallery called');
    this.attachements = await this.utility.openGallery(this.attachements);
  }

  removeAttachment(i: number) {

    console.log('Index To Remove = ' + i);

    this.attachements.splice(i, 1);
  }
}
