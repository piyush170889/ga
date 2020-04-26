import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../core/dataservices/data.service';
import { ServerUrl } from '../core/constants/server-url';
import { Utility } from '../core/utility';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  formGroup: FormGroup;
  attachements: string[] = [];
  user: any = {};

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService,
    private utility: Utility
  ) {

    this.formGroup = this.fb.group({
      id: [this.user.id, Validators.required],
      first_name: [this.user.first_name, Validators.required],
      last_name: [this.user.last_name, Validators.required],
      gender: [this.user.gender, Validators.required],
      city: [this.user.city, Validators.required],
      dob: [this.user.dob, Validators.required],
      qualification: [this.user.qualification, Validators.required],
      active: [this.user.active, Validators.required],
      mobile1: [this.user.mobile1, Validators.required],
      mobile2: [this.user.mobile2, Validators.required],
      mobile3: [this.user.mobile3, Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {

    let userDetailsApi: string = ServerUrl.USER_DTLS;
    this.dataService.get({ url: userDetailsApi })
      .subscribe(
        (response: any) => {
          console.log('response = ', response);
          this.user = response;

          this.formGroup.controls['id'].setValue(this.user.id);
          this.formGroup.controls['first_name'].setValue(this.user.first_name);
          this.formGroup.controls['last_name'].setValue(this.user.last_name);
          this.formGroup.controls['gender'].setValue(this.user.gender);
          this.formGroup.controls['city'].setValue(this.user.city);
          this.formGroup.controls['dob'].setValue(this.user.dob);
          this.formGroup.controls['qualification'].setValue(this.user.qualification);
          this.formGroup.controls['active'].setValue(this.user.active);
          this.formGroup.controls['mobile1'].setValue(this.user.mobile1);
          this.formGroup.controls['mobile2'].setValue(this.user.mobile2);
          this.formGroup.controls['mobile3'].setValue(this.user.mobile3);
        },
        (err) => {
          console.log('Error', err);
          alert('Error Ocuured Getting User Details');
        }
      );
  }

  updateUserData() {

    console.log('updateUserData() called');
    console.log(this.formGroup.value);
    console.log('Attachments = ');
    console.log(this.attachements);

    let data: any = this.formGroup.value;
    data['attachments'] = this.attachements;
    console.log('data = ', data);

    this.dataService.post({ url: ServerUrl.EDIT_USERS, data: data, isLoader: true })
      .subscribe(
        (response) => {
          console.log('Response = ' + JSON.stringify(response));
          alert('User details updated successfully');
        },
        (err) => {
          console.log(err);
          alert('Failed to update user details');
        }
      );
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