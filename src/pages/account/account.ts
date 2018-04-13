import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Details } from './details';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { EmergencyContactsPage } from "../emergency-contacts/emergency-contacts";
import { Storage } from '@ionic/storage';
import { LoginPage } from "../login/login";
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  isEditing: boolean = false;
  public base64Image: string;

  displayDetails: Details = {
    "userName": "john titor6",
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
              private camera: Camera, private http : HttpClient,
              private storage: Storage, public authProvider: AuthProvider) {

  }


  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  takePicture() {
    let options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 500,
      quality: 100,
      allowEdit: true
    };

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;

      let cameraImageSelector = document.getElementById('camera-image');
      cameraImageSelector.setAttribute('src', this.base64Image);

    }).catch( err => {
      console.log(err);
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

  logOut() {
    this.authProvider.logout();
  }
}
