import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {emergencyDetails} from './emergencyDetails';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the EmergencyInformationDisplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emergency-information-display',
  templateUrl: 'emergency-information-display.html',
})
export class EmergencyInformationDisplayPage {

  emergencyInformation: emergencyDetails = {
    userDetails: {
      userName: "",
      personalName: "",
      email: "",
      dateOfBirth: "",
      height: "",
      weight: "",
    },
    latitude: "",
    longitude: "",
    nearestTrail: "",
    primaryEmergencyContact: {
      contactName: "",
      primaryPhone: "",
      secondaryPhone: "",
      id: 0,
      user: ""
    }

  };

  constructor(public navParams: NavParams, public navCtrl: NavController, public storage: Storage) {
    this.emergencyInformation.userDetails = this.storage.get('userDetails')[0];
    this.emergencyInformation.latitude = this.navParams.get("latitude");
    this.emergencyInformation.longitude = this.navParams.get('longitude');
    this.emergencyInformation.nearestTrail = this.navParams.get('nearestTrail');
    this.emergencyInformation.primaryEmergencyContact = this.storage.get('emergencyContacts')[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmergencyInformationDisplayPage');
  }

}
