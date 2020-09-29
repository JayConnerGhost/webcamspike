import { Component, OnInit } from '@angular/core';
import {AlertifyService} from "../services/alertify.service";
import {WebcamInitError} from "ngx-webcam";

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {

  constructor(private alertify: AlertifyService) { }

  ngOnInit(): void {

  }

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
    this.alertify.error("Webcam Access not allowed by user");
    }
  }
}
