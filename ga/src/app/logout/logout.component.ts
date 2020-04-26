import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit, AfterViewInit {

  constructor(
    private router: Router
  ) {

  }

  ngOnInit() { }

  ngAfterViewInit() {

    console.log('ngAfterViewInit called');
    
    localStorage.clear();
    this.router.navigate(['/']).then(
      () => {
        console.log('Logged Out Successully');
      }
    );
  }
}
