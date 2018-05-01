import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AuthenticationServiceProvider } from '../../providers/authentication-service/authentication-service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  userDetails = { username: '', first_name: '', last_name: '', email: '', password:''};
  accountCreated = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    public authenticationServiceProvider: AuthenticationServiceProvider,
    public inAppBrowser: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public register() {
    this.authenticationServiceProvider.register(this.userDetails).subscribe(
      response => {
        this.accountCreated = true;
        this.showPopup("Success", "Account for \""+this.userDetails.username+"\" has been created.");
      },
      err => {
        this.showPopup("Error", "There was an error when creating your account.");
      }
    );
  }

  public showPopup(title, body) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: body,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.accountCreated) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  public smart911Link() {
    window.open('https://www.smart911.com/', '_system');
  }

}
