import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../core/dataservices/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formGroup: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService
  ) {

    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      qual: ['', Validators.required],
      city: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      pass: ['', Validators.required],
      mthree: ['', Validators.required],
      mtwo: ['', Validators.required],
      mone: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  registerUser() {

    console.log('registerUser() called');
    console.log(this.formGroup.value);

    // let registerUrl = '';
    // this.dataService.post({ url: registerUrl, data: this.formGroup.value, isLoader: true })
    //   .subscribe(
    //     (response) => {
    //       console.log('Response = ' + JSON.stringify(response));
    //       this.router.navigateByUrl('home');
    //     },
    //     (err) => {
    //       console.log(err);

    //     }
    //   )

    this.router.navigateByUrl('home');
  }
}
