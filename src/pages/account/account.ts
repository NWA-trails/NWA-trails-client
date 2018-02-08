import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Details } from './details';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  isEditing: boolean = false;

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //Check files for account information
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
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

}
