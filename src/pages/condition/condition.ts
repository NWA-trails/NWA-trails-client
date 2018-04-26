import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { conditionDetails } from './conditionDetails';
import { Storage } from '@ionic/storage';
import * as leafletKnn  from "leaflet-knn";
import * as  trailJSON  from "../../assets/GeoJSON/trailJSON.json";
import leaflet from "leaflet";

@Component({
  selector: 'page-condition',
  templateUrl: 'condition.html'
})
export class ConditionPage {
  public trail: string;
  public condiPicture: string;
  public pictureData: string;
  public checkPic: string;
  public reportDescription: string;
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
      this.condiPicture = "data:image/jpeg;base64," + imageData;

      let cameraImageSelector = document.getElementById('condi-picture');
      cameraImageSelector.setAttribute('src', this.condiPicture);

    }).catch(err => {
      console.log(err);
    });
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Help',
      subTitle: '<p> The purpose of this screen is to report any adverse trail conditions to trail managers as well as fellow app users. <br /> To submit a notice: <br /> 1. Take a picture of the problem. <br /> 2. Write a brief description describing the problem. <br /> 3. Press Submit!</p>',
      buttons: ['OK']
    });
    alert.present();
  }

  submit() {
    this.geolocation.getCurrentPosition().then((position) => {
       var closestTrail = this.nearBy(position.coords.latitude, position.coords.longitude);
      var report: conditionDetails = {
        //waiting to get user storage sorted out
        username: this.username,
        //still have to add in the html
        description: this.reportDescription,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        image: this.stringToByteArray(this.pictureData),
        trail: this.trail
      };
      this.http.post('https://nwa-trails-webservice.herokuapp.com/trailcondition/add', report).subscribe(res => {
        // alert(res);

      });
      this.navCtrl.setRoot(ConditionPage);
    }, (err) => {
      // alert("getting location error");
      // alert(err);
    });
    alert("Thank you for submitting a trail condition!");

  }

  nearBy(lat, lng)
  {
    var lnglat = [lng, lat];
    var index = leafletKnn(leaflet.geoJSON(trailJSON)).nearest(lnglat, 1, 1000);
    //index.nearest(latlng, 1,10);
    //show me something
    if (index !== undefined) {
      return index[0].layer.feature.properties.first_prim_name;
    } else {
      console.log("Could not find a nearby trail :(");
      return 'No closest Trail';
    }

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
