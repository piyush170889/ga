import { Injectable } from "@angular/core";
import { CameraOptions, Camera } from "@ionic-native/camera/ngx";
import { ServerUrl } from "./constants/server-url";

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

    public convertBase64ToArrayBuffer(base64: string): ArrayBuffer {

        try {
            let binary_string = window.atob(base64);
            let len = binary_string.length;
            let bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        } catch (e) {
            console.log("Base64 = " + base64);
            console.log(e);
            throw e;
        }
    }

    async uploadFormData(url: string, fd: FormData) {

        let req = fetch(url, {
            method: "post",
            body: fd
        });

        let isUploaded: boolean = false;

        return await req
            .then(
                async res => {
                    if (res.ok) {

                        console.log('res = ', res);
                        isUploaded = true;
                    } else {
                        console.error(res);
                        alert('Failed to upload document');
                    }
                    return isUploaded;
                }
            )
            .catch(
                (err) => {
                    console.error(err);
                    alert('Failed to upload document.');
                    return isUploaded;
                }
            );
    }


    getDownloadLink(fileName: string, docType: string) {

        return ServerUrl.MAIN + 'download.php?fileName=' + fileName + '&docType=' + docType;
    }
}