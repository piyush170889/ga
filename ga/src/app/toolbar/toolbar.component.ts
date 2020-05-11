import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../core/dataservices/data.service';
import { ServerUrl } from '../core/constants/server-url';
import { ApplicationConstants } from '../core/constants/application-constants';
import { EventEmitter } from '@angular/core';
import { Utility } from '../core/utility';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  user: any = {};
  @Output() userDataEvent = new EventEmitter();

  constructor(
    private router: Router,
    private dataService: DataService,
    private utility: Utility
  ) {
    let userInfo: any = localStorage.getItem(ApplicationConstants.LS_USER_INFO);

    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      let userDetailsApi: string = ServerUrl.USER_DTLS + userInfo.id;
      console.log('userDetailsApi = ', userDetailsApi);

      this.dataService.get({ url: userDetailsApi })
        .subscribe(
          (response: any) => {
            console.log('response = ', response);
            this.user = response.response[0];

            localStorage.setItem(ApplicationConstants.LS_USER_INFO, JSON.stringify(this.user));
            this.userDataEvent.emit(this.user);
          },
          (err) => {
            console.log('Error', err);
            alert('Error Occured Getting User Details');
          }
        );
    } else {
      console.log('User Not Logged In');
      this.router.navigateByUrl('logout');
    }
  }

  ngOnInit() {
  }

  updateProfile() {

    console.log('updateProfile()');

    this.router.navigateByUrl('home/edit-user');
  }

  setUser(user: any) {

    this.user = user;
  }

  getUserDetails(): any {

    return this.user;
  }

  getDownloadLink(saved_file_name) {

    return this.utility.getDownloadLink(saved_file_name, 'PR');
  }
}
