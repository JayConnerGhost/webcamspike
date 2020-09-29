import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebcamDataTransferService {
  webcamImageURL;
  webCamChangedEvent: BehaviorSubject<string> = new BehaviorSubject(this.webcamImageURL);
  sharedMessage = this.webCamChangedEvent.asObservable();
  constructor() { }

  AddWebCamImage(dataURL){
    this.webCamChangedEvent.next(dataURL);
  }
}
