import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { contactDetails } from './contactDetails'
import { CallNumber } from '@ionic-native/call-number'

@IonicPage()
@Component({
  selector: 'page-emergency-contacts',
  templateUrl: 'emergency-contacts.html',
})
export class EmergencyContactsPage {

  contacts: contactDetails[] = [
    {
      "personalName": "Michael Hinkley",
      "primaryPhone": "469-955-1980",
      "secondaryPhone": "555-555-5555"
    },
    {
      "personalName": "Al Smith",
      "primaryPhone": "555-555-5555",
      "secondaryPhone": "555-555-5555"
    }
];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, public toastCtrl: ToastController,
              private callNumber: CallNumber) {

  }
  

  onCall(primaryPhone, secondaryPhone) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose Number to call');

    alert.addInput({
      type: 'radio',
      label: primaryPhone,
      value: primaryPhone,
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: secondaryPhone,
      value: secondaryPhone,
      checked: false
    });

    alert.addButton({
      text: 'CALL',
      handler: data => {
        this.initCall(data);
      }
    });

    alert.addButton('Cancel');

    alert.present();
  }

  initCall(phoneNumber) {
    console.log("emergency call");
    this.callNumber.callNumber(phoneNumber, true)
      .then(() => console.log('Launched dialer: '+phoneNumber))
      .catch(() => console.log('Error launching dialer'));

    let toast = this.toastCtrl.create({
      message: 'Phone number called: ' + phoneNumber,
      duration: 3000
    });

    toast.present();
  }

  addContact() {
    let prompt = this.alertCtrl.create({
      title: 'Create New Emeregency Contact',
      inputs: [
        {
          name: 'Name',
          placeholder: 'Contact Name...'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        }
      ]
    });

    prompt.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmergencyContactsPage');
  }

}
