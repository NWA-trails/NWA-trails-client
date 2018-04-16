import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { conditionDetails } from './conditionDetails';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-condition',
  templateUrl: 'condition.html'
})
export class ConditionPage {
  public trail: string;
  public picture: string;
  public pictureData: string;
  public checkPic: string;
  public reportDescription: string;
  public username: string;
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public camera: Camera, public http: HttpClient, public geolocation : Geolocation, public storage: Storage) {
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
      this.picture = "data:image/jpeg;base64," + imageData;

      let cameraImageSelector = document.getElementById('camera-image');
      cameraImageSelector.setAttribute('src', this.picture);

    }).catch( err => {
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

      var report: conditionDetails = {
        //waiting to get user storage sorted out
        username:this.username,
        //still have to add in the html
        description:this.reportDescription,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        image: this.stringToByteArray(this.pictureData),
        trail: this.trail
      };
        alert("posting");
          this.http.post('https://nwa-trails-webservice.herokuapp.com/trailcondition/add' , report).subscribe( res => {
            alert(res);

         });
    }, (err) => {
      alert("getting location error");
      alert(err);
    });



  }

  stringToByteArray(s)
  {
    var data = [];
    for (var i = 0; i < s.length; i++){
      data.push(s.charCodeAt(i));
    }
    return data;
  }

  byteArrayToString(array)
   {
  	var result = "";
  	for(var i = 0; i < array.length; ++i){
  		result+= (String.fromCharCode(array[i]));
  	}
  	return result;
  }

}
