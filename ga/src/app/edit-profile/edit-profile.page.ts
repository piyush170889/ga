import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../core/dataservices/data.service';
import { ServerUrl } from '../core/constants/server-url';
import { Utility } from '../core/utility';
import { ApplicationConstants } from '../core/constants/application-constants';
import { ToolbarComponent } from '../toolbar/toolbar.component';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  formGroup: FormGroup;
  attachments: string[] = [];
  user: any = {};
  // @ViewChild(ToolbarComponent, { static: false }) toolbarChildComponent: ToolbarComponent;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService,
    private utility: Utility
  ) {

    console.log('Attachments Legth = ', this.attachments.length);

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
      // password: ['', Validators.required]
    });
  }

  ngOnInit() {

    // let userInfo: any = localStorage.getItem(ApplicationConstants.LS_USER_INFO);

    // if (userInfo) {
    //   userInfo = JSON.parse(userInfo);
    //   let userDetailsApi: string = ServerUrl.USER_DTLS + userInfo.id;
    //   console.log('userDetailsApi = ', userDetailsApi);

    //   this.dataService.get({ url: userDetailsApi })
    //     .subscribe(
    //       (response: any) => {
    //         console.log('response = ', response);
    //         this.user = response.response[0];

    //         this.formGroup.controls['id'].setValue(this.user.id);
    //         this.formGroup.controls['first_name'].setValue(this.user.first_name);
    //         this.formGroup.controls['last_name'].setValue(this.user.last_name);
    //         this.formGroup.controls['gender'].setValue(this.user.gender);
    //         this.formGroup.controls['city'].setValue(this.user.city);
    //         this.formGroup.controls['dob'].setValue(this.user.dob);
    //         this.formGroup.controls['qualification'].setValue(this.user.qualification);
    //         this.formGroup.controls['active'].setValue(this.user.active);
    //         this.formGroup.controls['mobile1'].setValue(this.user.mobile1);
    //         this.formGroup.controls['mobile2'].setValue(this.user.mobile2);
    //         this.formGroup.controls['mobile3'].setValue(this.user.mobile3);

    //         this.user.attachments.array.forEach(attachement => {
    //           let downloadUrl: string = '/download.php?id=' + attachement.id;
    //           this.attachments.push(downloadUrl);
    //         });
    //       },
    //       (err) => {
    //         console.log('Error', err);
    //         alert('Error Ocuured Getting User Details');
    //       }
    //     );
    // } else {
    //   console.log('No User Info found in storage');
    //   this.router.navigateByUrl('logout');
    // }
  }

  updateUserDataFromChild(eventData: any) {

    console.log('User Data = ', eventData);

    this.user = eventData;
    console.log('User from child = ', this.user);

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

    this.attachments = this.user.attachments;
    // this.user.attachments.forEach(attachement => {
    //   let downloadUrl: string = '/download.php?id=' + attachement.id;
    //   this.attachments.push(downloadUrl);
    // });
  }

  updateUserData() {

    console.log('updateUserData() called');
    console.log(this.formGroup.value);
    console.log('Attachments = ');
    console.log(this.attachments);

    let data: any = this.formGroup.value;
    data['attachments'] = this.attachments;
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

  removeAttachment(i: number, attachmentId: string) {

    console.log('Index To Remove = ' + i + ', attachmentId = ' + attachmentId);

    let confirmDelete = confirm('Are you sure you want to delete this item?');

    if (confirmDelete) {

      let deleteApiEndpoint: string = ServerUrl.DELETE_ATTC + attachmentId;
      console.log('deleteApiEndpoint = ', deleteApiEndpoint);

      this.dataService.delete({ url: deleteApiEndpoint, isLoader: true })
        .subscribe(
          (response) => {
            console.log('Resposne = ', response);
            this.attachments.splice(i, 1);
          }
        );
    }
  }

  async openGallery() {

    console.log('openGallery called');
    let galleryAttachments: any[] = [];
    galleryAttachments = await this.utility.openGallery(galleryAttachments);
    console.log('galleryAttachments = ', galleryAttachments);

    if (galleryAttachments.length > 0) {

      let galleryAttachmentsToPass: string = galleryAttachments[0].split(ApplicationConstants.SPLIT_KEY_BASE64)[1];
      let fd: FormData = this.getFormDataWithFileContent('fileContent', galleryAttachmentsToPass);
      fd.append('id', this.user.id);
      fd.append('doc_type', 'ATTC');

      let uploadDocApiEndpoint: string = ServerUrl.MAIN + ServerUrl.UPLOAD_DOC;
      let isUploaded: boolean = await this.utility.uploadFormData(uploadDocApiEndpoint, fd);

      if (isUploaded) {
        let userDetailsApi: string = ServerUrl.USER_DTLS + this.user.id;
        console.log('userDetailsApi = ', userDetailsApi);

        this.dataService.get({ url: userDetailsApi })
          .subscribe(
            (response: any) => {
              console.log('response = ', response);
              this.user = response.response[0];

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

              this.attachments = this.user.attachments;
              // .array.forEach(attachement => {
              //   let downloadUrl: string = '/download.php?id=' + attachement.id;
              //   this.attachments.push(downloadUrl);
              // });

              alert('Certificate uplaoded successfully')
            },
            (err) => {
              console.log('Error', err);
              alert('Error Ocuured Getting User Details');
            }
          );
      }
    }
  }

  private getFormDataWithFileContent(key: string, fileContent: string): FormData {

    try {
      console.log('getFormDataWithFileContent called');
      var fd = new FormData();
      fd.append(
        key,
        new Blob([this.utility.convertBase64ToArrayBuffer(fileContent)])
      );

      return fd;
    } catch (e) {
      throw e;
    }
  }

  getDownloadLink(saved_file_name) {
    return this.utility.getDownloadLink(saved_file_name, 'ATTC');
  }
}