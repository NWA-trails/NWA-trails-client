import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Details } from './details';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { EmergencyContactsPage } from "../emergency-contacts/emergency-contacts";

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  isEditing: boolean = false;
  public base64Image: string;

  displayDetails: Details = {
    "userName": "john123",
    "personalName": "John Doe",
    "email": "test@gmail.com",
    "dateOfBirth": "01/01/1901",
    "height": "6'0\"",
    "weight": "125"
  }

  formResult = {
    "personalName": "",
    "email": "",
    "dateOfBirth": "",
    "height": "",
    "weight": ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private camera: Camera) {
    
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpg;base64,' + imageData;

      let cameraImageSelector = document.getElementById('camera-image');
      cameraImageSelector.setAttribute('src', this.base64Image);
    }, (error) => {
      console.log('unable to take picture');
    });
  }

  saveDetailsChanges() {
    this.isEditing = false;

    for (var property in this.formResult) {
      if (this.formResult[property] != "") {
        this.displayDetails[property] = this.formResult[property];
      }
      
    }
  }

  cancelDetailsChanges() {
    this.isEditing = false;
    this.resetForm();
  }

  resetForm() {
    for (var property in this.formResult) {
      this.formResult[property] = this.displayDetails[property];
    }
  }

  emergencyContacts() {
    this.navCtrl.push(EmergencyContactsPage);
  }
}
