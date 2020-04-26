import { Injectable } from "@angular/core";
import { CameraOptions, Camera } from "@ionic-native/camera/ngx";

@Injectable()
export class Utility {

    constructor(
        private camera: Camera
    ) { }


    diff_years(dt2: Date, dt1: Date): number {

        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60 * 24);
        return Math.abs(Math.round(diff / 365.25));
    }


    async openGallery(attachements: any[] = []) {

        if (attachements.length < 5) {

            let cameraOptions: CameraOptions = {
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: this.camera.DestinationType.DATA_URL,
                quality: 100,
                targetWidth: 1000,
                targetHeight: 1000,
                encodingType: this.camera.EncodingType.JPEG,
                correctOrientation: true
            }

            return await this.camera.getPicture(cameraOptions)
                .then(
                    (data_uri) => {
                        console.log(data_uri);
                        let base64Image: string = 'data:image/jpeg;base64,' + data_uri;
                        attachements.push(base64Image);

                        return attachements;
                    },
                    (err) => {
                        console.log(err);
                        return attachements;
                    }
                );
        } else {
            alert('You can have maximum 5 attachments');
            return attachements;
        }
    }


}