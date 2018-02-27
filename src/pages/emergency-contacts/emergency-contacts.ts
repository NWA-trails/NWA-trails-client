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

  isEditing: boolean = false;

  contacts: contactDetails[] = [
    {
      "contactId": 1,
      "personalName": "Michael Hinkley",
      "primaryPhone": "469-955-1980",
      "secondaryPhone": "555-555-5555"
    },
    {
      "contactId": 2,
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
    phoneNumber = "4793877620";

    this.callNumber.callNumber(phoneNumber, false)
      .then(() => console.log('Launched dialer: '+phoneNumber))
      .catch(() => console.log('Error launching dialer'));

    let toast = this.toastCtrl.create({
      message: 'Phone number called: ' + this.callNumber.isCallSupported(),
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

  editContact(contact) {
    let prompt = this.alertCtrl.create({
      title: 'Edit Contact Information',
      inputs: [
        {
          name: 'contactName',
          placeholder: contact.personalName
        },
        {
          name: 'primaryPhone',
          placeholder: contact.primaryPhone
        },
        {
          name: 'secondaryPhone',
          placeholder: contact.secondaryPhone
        },
      ],
      buttons: [
        {
          text: 'Save',
          handler: data => {
            if (this.validatePhoneNumber(data.primaryPhone)) {

            }

            this.saveContact(contact, data);
          }
        },
        {
          text: 'Cancel'
        }
      ]
    });

    prompt.present();
  }

  saveContact(contact, data) {
    
  }

  validatePhoneNumber(phoneNumber): boolean {
    if (phoneNumber == null) {
      return true;
    } 

    this.showErrorToast(phoneNumber);
  }

  showErrorToast(data: any) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmergencyContactsPage');
  }

}
