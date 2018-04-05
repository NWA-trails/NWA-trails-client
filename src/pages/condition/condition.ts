import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { conditionDetails } from './conditionDetails'

@Component({
  selector: 'page-condition',
  templateUrl: 'condition.html'
})
export class ConditionPage {
  public picture: string;
  public pictureData: string;
  public checkPic: string;
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public camera: Camera, public http: HttpClient, public geolocation : Geolocation) {

  }

  takePicture() {

    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      this.picture = "data:image/jpeg;base64," + imageData;
      this.pictureData = imageData;
    }, (err) => {
      alert("prob");
      alert(err);
      console.log(err);
    });
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Help',
      subTitle: '<p> The purpose of this screen is to report any adverse trail conditions to trail managers as well as fellow app users. <br /> To submit a notice: <br /> 1. Take a picture of the problem. <br /> 2. Right a brief description describing the problem. <br /> 3. Press Submit!</p>',
      buttons: ['OK']
    });
    alert.present();
  }

  submit()
  {
     this.geolocation.getCurrentPosition().then((position) => {
      var repot: conditionDetails = {
        //waiting to get user storage sorted out
        username:"test",
        //still have to add in the html
        description:"there is a condition to report and this is a test:)",
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        image: this.pictureData
      };
      alert(JSON.stringify(repot));
    }, (err) => {
      alert("getting location error");
      alert(err);
    });




//     alert("Thank you for submitting a conditions report!");
//
// //re-run the view load function if the page has one declared
//     //this.navCtrl.push(ConditionPage);
//     this.http.post('https://nwa-trails-webservice.herokuapp.com/user/image' , this.pictureData).subscribe( res => {
//
//     this.checkPic = "data:image/jpeg;base64," + res["image"];
//     if(this.checkPic != this.picture)
//       alert("images not the same");
//      else alert("all good with the pics");
//
//    }, (err) => {
//      alert("error with post");
//      alert(JSON.stringify(err));
//    });
  }

  stringToByteArray(s)
  {

    var data = [];
    for (var i = 0; i < s.length; i++){
      data.push(s.charCodeAt(i));
    }
    return data;
  }
}
