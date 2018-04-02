import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';

/**
 * Generated class for the InitialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-initial',
  templateUrl: 'initial.html',
})
export class InitialPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage) {
      this.checkIfLoggedIn();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitialPage');
  }

  public checkIfLoggedIn() {
    this.storage.get('username').then(
      value => {
        if(value != null) {
          this.navCtrl.setRoot(TabsPage);
        } else {
          this.navCtrl.setRoot(LoginPage);
        }
      },
      error => {
        console.log("Couldn't find a stored username.");
        this.navCtrl.setRoot(LoginPage);
      }
    );
  }

}
