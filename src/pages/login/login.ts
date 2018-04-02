import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationServiceProvider } from '../../providers/authentication-service/authentication-service';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials = { username: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authenticationServiceProvider: AuthenticationServiceProvider,
    public storage: Storage, public http : HttpClient) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login(credentials) {
    this.authenticationServiceProvider.login(this.credentials).subscribe(
      response => {
        console.log("response: ")
        console.log(response);
        this.storage.set('username',this.credentials.username).then(
          success => {
            this.setEmergencyContactsLocally()
            this.navCtrl.setRoot(TabsPage);
          },
          error => {
            console.log("Failed to save username \"" + this.credentials.username + "\" to storage");
          }
        );
      },
      err => {
        console.log("error: ");
        console.log(err);
      }
    );


  }

  setEmergencyContactsLocally() {
    var username = this.storage.get('username').then((username) => {
      this.http.get('https://nwa-trails-webservice.herokuapp.com/emergencycontact/findByUsername?username=' + username).subscribe( res => {
        console.log(res);
        this.storage.set('emergencyContacts', res);

      });
    });
  }

  public createAccount() {
    this.navCtrl.push(RegisterPage);
  }

}
