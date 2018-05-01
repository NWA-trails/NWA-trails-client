import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountDetails } from './details';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { EmergencyContactsPage } from "../emergency-contacts/emergency-contacts";
import { Storage } from '@ionic/storage';
import { LoginPage } from "../login/login";

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  isEditing: boolean = false;
  public base64Image: string;
  public rawImage: string;

  displayDetails: AccountDetails = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    dateofbirth: "",
    height: "",
    weight: "",
    role: ""
  };

  formResult = {
    dateofbirth: "",
    height: "",
    weight: ""
  };

  testImage = {
    username: "",
    image: ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private camera: Camera, private http : HttpClient,
              private storage: Storage) {
                this.storage.get('userDetails').then((details) => {
                  console.log("Details received on account page: ", details);
                  for (var property in details) {
                    if (details[property] != "") {
                      this.displayDetails[property] = details[property];
                    }
                  }

                  console.log("Actual Account Details: ", this.displayDetails);
                });

                this.storage.get('profilePicture').then((picture) => {
                  if (picture) {
                    if (picture.image != "") {
                      this.rawImage = picture.image;
                      this.base64Image = "data:image/jpeg;base64," + picture.image;
                      let cameraImageSelector = document.getElementById('account-image');
                      cameraImageSelector.setAttribute('src', this.base64Image);
                    }
                  }

                  console.log("Profile picture is: ", picture);
                });
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
      this.rawImage = imageData;

      let cameraImageSelector = document.getElementById('account-image');
      cameraImageSelector.setAttribute('src', this.base64Image);

    }).catch( err => {
      console.log(err);
    });
  }

  saveDetailsChanges() {
    console.log("Saving changes...");
    this.isEditing = false;

    this.testImage.image = this.rawImage;
    this.testImage.username = this.displayDetails.username;
    this.http.put('https://nwa-trails-webservice.herokuapp.com/profilepicture/update', this.testImage).subscribe((res) => {
      console.log("Updated Picture");
    });

    console.log("Form data is: ", this.formResult);
    for (var property in this.formResult) {
      if (this.formResult[property] != "") {
        this.displayDetails[property] = this.formResult[property];
      }
    }

    var userPersonalInformation = {
      username: this.displayDetails.username,
      dateofbirth: this.displayDetails.dateofbirth,
      height: this.displayDetails.height,
      weight: this.displayDetails.weight
    }

    console.log("Uopdating account information: ", userPersonalInformation);

    this.http.post('https://nwa-trails-webservice.herokuapp.com/accountInformation/updateAccountInformation', userPersonalInformation).subscribe((res) => {
      console.log("Updated account information");
    });

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
    this.storage.remove('username').then(
      success => {
        console.log("Logged out");
        this.navCtrl.setRoot(LoginPage);
        document.location.href = 'index.html';
      },
      err => {
        console.log("Failed to log out");
        console.log(err);
      }
    );
  }
}
