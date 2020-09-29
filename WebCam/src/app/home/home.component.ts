import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {WebcamComponent} from "../webcam/webcam.component";
import {WebcamDataTransferService} from "../services/webcam-data-transfer.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 imageURL='';
  constructor(private dialog: MatDialog,
              public webcamDTC: WebcamDataTransferService ) { }

  ngOnInit(): void {
    this.webcamDTC.sharedMessage.subscribe(dataURL =>{
      this.imageURL=dataURL;
    })
  }
//TODO: create dialog on button click


  openWebCam() {
    const dialogRef = this.dialog.open(
      WebcamComponent,
      {width: '450px', height:'400px'}
    );
    dialogRef.afterClosed().subscribe(() => {

       });
  }
}
