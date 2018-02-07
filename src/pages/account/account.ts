import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Details } from './details';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  displayDetails: Details = {
    "userName": "john123",
    "personalName": "John Doe",
    "email": "test@gmail.com",
    "dateOfBirth": "01/01/1901",
    "height": "6'0\"",
    "weight": "125"
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //Call to server to get userDetails
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}
