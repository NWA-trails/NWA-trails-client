import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { pointsDetails } from './pointsDetails'

@Component({
  selector: 'page-points',
  templateUrl: 'points.html'
})
export class PointsPage {
  public picture: string;
  public pictureData: string;
  public checkPic: string;
  public reportDescription: string;
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public camera: Camera, public http: HttpClient, public geolocation : Geolocation) {

    //this.forDavid();

  }

  forDavid()
  {
    /*this.http.get('https://nwa-trails-webservice.herokuapp.com/trailcondition/getAll').subscribe( res => {
      alert("trying to display complete report Michael put on db for David");
      alert(JSON.stringify(res[0]));
      var s_image = this.byteArrayToString(res[0].image)
      this.picture = "data:image/jpeg;base64," + s_image;
      this.reportDescription = res[0].description;

   }, (err) => {
     alert("error here");
     alert(JSON.stringify(err));
   });*/
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
      subTitle: '<p> On this screen, you can suggest trail locations to add to the map page. Examples of locations to submit are stores, stops and landmarks. <br /> To submit a point of interest: <br /> 1. Take a picture. <br /> 2. Describe the point. <br /> 3. Press Submit! < br /> 4. If approved, the point will be added onto the map page. <br />', buttons: ['OK']
    });
    alert.present();
  }

  submit()
  {
     this.geolocation.getCurrentPosition().then((position) => {
      var report: pointsDetails = {
        //waiting to get user storage sorted out
        username:"BLAZINGDAMON",
        //still have to add in the html
        description:this.reportDescription,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        image: this.stringToByteArray(this.pictureData)
      };
      this.http.post('https://nwa-trails-webservice.herokuapp.com/pointofinterest/add' , report).subscribe( res => {
            alert(res);

         });
    }, (err) => {
      alert("getting location error");
      alert(err);
    });

    alert("so its all in the table and everything...i just dont know how to clear this page without breaking it....Sincerely, Michael");

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
