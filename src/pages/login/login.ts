import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthenticationServiceProvider } from '../../providers/authentication-service/authentication-service';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { HttpClient } from '@angular/common/http';
import { AccountDetails } from "../account/details";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials = { username: '', password: ''};

  userDetails: AccountDetails = {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      dateofbirth: "",
      height: "",
      weight: "",
      role: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authenticationServiceProvider: AuthenticationServiceProvider,
    public storage: Storage, public http : HttpClient,
    public toast: ToastController) {

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
            this.setUserInformationLocally();
            this.setEmergencyContactsLocally();
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
        this.showToast("Failed to log in.");
      }
    );


  }

  setUserInformationLocally() {
    var username = this.storage.get('username').then((username) => {
      this.http.get('https://nwa-trails-webservice.herokuapp.com/user/getUserDetails/' + username).subscribe( (res) => {
        console.log("User Details received are: ", res);
        for (var property in res) {
          if (res[property] != "") {
            this.userDetails[property] = res[property];
          }
        }

        this.storage.set('userDetails', res);
      });


      this.http.get('https://nwa-trails-webservice.herokuapp.com/profilepicture/get/' + username).subscribe((profilePicture) => {
        console.log("Received profile picture: ", profilePicture);
        this.storage.set('profilePicture', profilePicture);
      });
    });
  }

  setEmergencyContactsLocally() {
    var username = this.storage.get('username').then((username) => {
      this.http.get('https://nwa-trails-webservice.herokuapp.com/emergencycontact/findByUsername?username=' + username).subscribe( res => {
        console.log(res);
        this.storage.set('emergencyContacts', res);

      });
    });
    this.storage.get('emergencyContacts').then((contact) => {
      console.log("e-contacts at login: ", contact);
    });

  }

  public createAccount() {
    this.navCtrl.push(RegisterPage);
  }

  public showToast(data) {
    let newToast = this.toast.create({
      message: data,
      duration: 500,
      position: 'bottom'
    });

    newToast.present();
  }
}
