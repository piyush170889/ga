import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../core/dataservices/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService
  ) {

    let isLoggedIn: string = localStorage.getItem('isLoggedIn');

    if (isLoggedIn == '1')
      this.router.navigateByUrl('home');

    this.formGroup = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required]
      }
    )
  }

  ngOnInit() { }

  login() {

    console.log('login() called.');

    console.log(this.formGroup.value);

    // const loginUrl: string = 'login';
    // this.dataService.post({ url: loginUrl, data: this.formGroup.value, isLoader: true })
    //   .subscribe(
    //     (response) => {
    //       console.log('Response = ' + JSON.stringify(response));
    //       this.router.navigateByUrl('home');
    //     },
    //     (err) => {
    //       console.log(err);

    //     }
    //   );

    this.router.navigateByUrl('home');

  }

}
