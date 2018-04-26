import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { pointsDetails } from './pointsDetails';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-points',
  templateUrl: 'points.html'
})
export class PointsPage {
  public poiPicture: string;
  public pictureData: string;
  public checkPic: string;
  public reportDescription: string;
  public trail: string;
  public username: string;
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public camera: Camera, public http: HttpClient, public geolocation: Geolocation, public storage: Storage) {

    this.storage.get('closestTrail').then((trail) => {
      this.trail = trail;
    });
    this.storage.get('username').then((username) => {
      this.username = username;
    });
  }


  takePicture() {

    let options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 500,
      quality: 100,
      allowEdit: true
    };

    this.camera.getPicture(options).then((imageData) => {
      this.pictureData = imageData;
      this.poiPicture = "data:image/jpeg;base64," + imageData;

      let cameraImageSelector = document.getElementById('poi-picture');
      cameraImageSelector.setAttribute('src', this.poiPicture);

    }).catch(err => {
      console.log(err);
    });
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Help',
      subTitle: '<p> On this screen, you can suggest trail locations to add to the map page. Examples of locations to submit are stores, stops and landmarks. <br /> To submit a point of interest: <br /> 1. Take a picture. <br /> 2. Describe the point. <br /> 3. Press Submit! < br /> 4. If approved, the point will be added onto the map page. <br />', buttons: ['OK']
    });
    alert.present();
  }

  submit() {
    this.geolocation.getCurrentPosition().then((position) => {
      var report: pointsDetails = {
        //waiting to get user storage sorted out
        username: this.username,
        //still have to add in the html
        description: this.reportDescription,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        image: this.stringToByteArray(this.pictureData),
        trail: this.trail
      };
      alert("posting");
      this.http.post('https://nwa-trails-webservice.herokuapp.com/pointofinterest/add', report).subscribe(res => {
        alert(res);

      });

      this.navCtrl.setRoot(PointsPage);

    }, (err) => {
      alert("getting location error");
      alert(err);
    })

  }

  stringToByteArray(s) {

    if (s) {
      var data = [];
      for (var i = 0; i < s.length; i++) {
        data.push(s.charCodeAt(i));
      }
      return data;
    }
    else return null;
  }

  byteArrayToString(array) {
    var result = "";
    for (var i = 0; i < array.length; ++i) {
      result += (String.fromCharCode(array[i]));
    }
    return result;
  }

}
