import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthenticationServiceProvider } from '../../providers/authentication-service/authentication-service';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AuthProvider } from '../../providers/auth/auth';
import { finalize } from 'rxjs/operators/finalize';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials = { "username": '', "password": ''};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage, public http : HttpClient,
    public toast: ToastController,
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login(credentials) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Logging in ...'
    });

    loading.present();

    console.log("Username: " + this.credentials.username + " and password is: " + this.credentials.password);

    this.authProvider
      .login(this.credentials)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe (
        () => {},
        err => console.log("Error when logging in: " + err.message)
      );
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
      duration: 1000,
      position: 'middle'
    });

    newToast.present();
  }
}
