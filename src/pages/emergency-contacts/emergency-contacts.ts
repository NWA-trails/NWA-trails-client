import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { contactDetails } from './contactDetails'
import { CallNumber } from '@ionic-native/call-number'
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';


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
              private callNumber: CallNumber, private storage: Storage, private http : HttpClient) {
    storage.get('emergencyContacts').then((val) => {
      if (val != null) {
        this.contacts = val;
      }
      storage.get('username').then((name) =>{
        console.log("name in ec, ", name);
      })
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
            this.saveContact(data);
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
    this.storage.get('username').then((username) => {
    contact.username = username.toUpperCase();

    this.http.post('https://nwa-trails-webservice.herokuapp.com/emergencycontact/add', contact).subscribe( response => {
        contact.id = response;
        this.contacts.push(contact);
        this.storage.set('emergencyContacts', this.contacts);
    });
    });






  }

  deleteContact(contact) {
    var index = this.contacts.indexOf(contact);

    if (index > -1) {
      var deletingContact = this.contacts[index];
      console.log(deletingContact);
      this.http.post('https://nwa-trails-webservice.herokuapp.com/emergencycontact/delete', deletingContact).subscribe( response => {
        console.log(response);

      });
      this.contacts.splice(index, 1);
    }

    this.storage.set('emergencyContacts', this.contacts);
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
