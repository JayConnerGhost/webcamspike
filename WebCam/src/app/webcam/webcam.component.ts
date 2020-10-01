import { Component, OnInit } from '@angular/core';
import {AlertifyService} from "../services/alertify.service";
import {WebcamImage, WebcamInitError, WebcamUtil} from "ngx-webcam";
import {Observable, Subject} from "rxjs";
import {WebcamDataTransferService} from "../services/webcam-data-transfer.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  constructor(private alertify: AlertifyService,
              public webcamDTC: WebcamDataTransferService,
              private dialogRef: MatDialogRef<WebcamComponent>) { }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
  });
  }
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: any = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    // custom code here to handle image
    this.webcamImage = webcamImage.imageAsDataUrl;
   // this.newImage.emit(webcamImage);
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }


  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
    this.alertify.error("Webcam Access not allowed by user");
    }
  }

  cancelPicture() {
    this.webcamImage=null;
  }

  savePicture() {
    this.webcamDTC.AddWebCamImage(this.webcamImage);
    this.dialogRef.close();
  }
}
