import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { contactDetails } from './contactDetails'

@IonicPage()
@Component({
  selector: 'page-emergency-contacts',
  templateUrl: 'emergency-contacts.html',
})
export class EmergencyContactsPage {

  contacts: contactDetails[] = [
    {
      "personalName": "John Doe",
      "primaryPhone": "479-555-5214",
      "secondaryPhone": "501-555-5521"
    },
    {
      "personalName": "Al Smith",
      "primaryPhone": "479-525-5514",
      "secondaryPhone": "501-532-5111"
    }
];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, public toastCtrl: ToastController) {
    
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
