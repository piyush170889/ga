import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../core/dataservices/data.service';
import { ServerUrl } from '../core/constants/server-url';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  user: any = {};

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {

    let userDetailsApi: string = ServerUrl.USER_DTLS;

    this.dataService.get({ url: userDetailsApi })
      .subscribe(
        (response: any) => {
          console.log('response = ', response);
          this.user = response;
        },
        (err) => {
          console.log('Error', err);
          alert('Error Occured Getting User Details');
        }
      );
  }

  updateProfile() {

    console.log('updateProfile()');

    this.router.navigateByUrl('home/edit-user');
  }

  setUser(user: any) {

    this.user = user;
  }

}
