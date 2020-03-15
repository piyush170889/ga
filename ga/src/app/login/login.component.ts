import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
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

    this.router.navigateByUrl('home');
    
  }

}
