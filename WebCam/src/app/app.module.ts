import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebcamComponent } from './webcam/webcam.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {WebcamModule} from "ngx-webcam";
import {MatDialogRef, MatDialog} from "@angular/material/dialog";
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    WebcamComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    WebcamModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },

  ],
  entryComponents: [
    WebcamComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
