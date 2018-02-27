import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { contactDetails } from './contactDetails'
import { CallNumber } from '@ionic-native/call-number'
import { Storage } from '@ionic/storage';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

@IonicPage()
@Component({
  selector: 'page-emergency-contacts',
  templateUrl: 'emergency-contacts.html',
})
export class EmergencyContactsPage {

  isEditing: boolean = false;

  contacts: contactDetails[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, public toastCtrl: ToastController,
              private callNumber: CallNumber, private storage: Storage) {
    storage.get('contacts').then((val) => {
      if (val != null) {
        this.contacts = val;
      }
    });
    
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

    this.callNumber.callNumber(phoneNumber, true)
      .then(() => console.log('Launched dialer: '+phoneNumber))
      .catch(() => console.log('Error launching dialer'));
  }

  addContact() {
    let prompt = this.alertCtrl.create({
      title: 'Create Emergency Contact',
      inputs: [
        {
          name: 'contactName',
          placeholder: 'Contact Name'
        },
        {
          name: 'primaryPhone',
          placeholder: 'Primary Phone Number'
        },
        {
          name: 'secondaryPhone',
          placeholder: 'Secondary Phone Number'
        },
      ],
      buttons: [
        {
          text: 'Save',
          handler: data => {
            this.saveContact(data);
          }
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
          placeholder: contact.contactName
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
          }
        },
        {
          text: 'Delete',
          handler: data => {
            this.deleteContact(contact)
          }
        },
        {
          text: 'Cancel'
        }
      ]
    });

    prompt.present();
  }

  saveContact(contact) {
    this.contacts.push(contact);
    this.storage.set('contacts', this.contacts);
  }

  deleteContact(contact) {
    var index = this.contacts.indexOf(contact);

    if (index > -1) {
      this.contacts.splice(index, 1);
    }

    this.storage.set('contacts', this.contacts);
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
