import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Storage } from '@ionic/storage';
import leaflet from "leaflet";
import { File } from '@ionic-native/file';
import { contactDetails } from './contactDetails';
import { SMS } from '@ionic-native/sms';
import { HTTP } from '@ionic-native/http';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: leaflet.Map;
  isEmergencyCallEnabled: boolean = false;
  buttonColor: string = 'default';
  contact: contactDetails;



  constructor(public navCtrl: NavController, private callNumber: CallNumber, private file: File, private http: HttpClient,
              public toastCtrl: ToastController, private storage: Storage, public alertCtrl: AlertController,
              private sms: SMS) {}

  ionViewDidLoad() {
    if(this.map == undefined) {
      this.loadLeafletMap();
    }
  }

  loadLeafletMap(){
    this.map = leaflet.map('mapId');
    if(this.map == undefined) alert("map is undefined");
    leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'edupala.com © ionic LeafLet'
    }).addTo(this.map);

    this.map.locate({
      setView:true,
      maxZoom:15
    }).on("locationfound", e => {
      console.log("locations found");
      var radius = e.accuracy / 3;
      if(this.map == undefined) alert("map is undefined");
      //leaflet.marker(e.latlng).addTo(this.map).bindPopup("You are within " + radius + " meters from this point").openPopup();
      leaflet.circle(e.latlng, radius).addTo(this.map);
    }).on('locationerror', e => {
      alert("Cannot find location.")
      alert(e.message);
    });

//
    //  alert(this.file.applicationDirectory);
    // this.file.readAsText(this.file.applicationDirectory +'www/assets/GeoJSON','trailJSON.geojson')
    // .then((geoData) => {
    //     alert("read successfully");
    //     alert(geoData.length);
    //    // var trailFeaturesCollection = JSON.parse(geoData);
    //    // this.addFeatureToMap(trailFeaturesCollection);
    //
    //
    //
    // }).catch(err => {
    //   alert("geoData issue");
    //   alert(err);
    //
    // });

  }

  addFeatureToMap(feature)
  {
    alert("adding to map");
     leaflet.geoJSON(feature).addTo(this.map);
  }

  onTouch() {
    this.buttonColor = 'danger';
  }

  initEmergencyCall() {
    this.buttonColor = 'secondary';
    this.isEmergencyCallEnabled = true;
  }

  onRelease() {
    this.buttonColor = 'default';

    if (this.isEmergencyCallEnabled) {
      this.verifyEmergencyCall();
    }

    this.isEmergencyCallEnabled = false;
  }

  emergencyCall() {
    var phoneNumber = "479-387-7620";
    console.log("emergency call");
    this.callNumber.callNumber(phoneNumber, true)
      .then(() => console.log('Launched dialer: '+phoneNumber))
      .catch(() => console.log('Error launching dialer'));

 }

 verifyEmergencyCall() {
  let prompt = this.alertCtrl.create({
    title: 'Are you sure you want to make an Emergency Call?',
    message: this.contact == null ?
      'Making this call will contact 9-1-1, gather information about your current location, send your primary emergency contact a notification, and will notify yourself of the gathered information.' :
      'Making this call will contact 9-1-1, gather information about your current location, send ' + this.contact.contactName + ' a notification to number ' + this.contact.primaryPhone + ' and will notify yourself of the gathered information'
    ,
    buttons: [
      {
        text: 'Agree',
        handler: () => {
          this.sendAlertToEmerContact();
          this.emergencyCall();
        }
      },
      {
        text: 'Disagree',
        handler: () => {
          let toast = this.toastCtrl.create({
            message: 'Emergency Call Cancled.',
            duration: 2000,
            position: 'top'
          });

          toast.present();
        }
      }
    ]
  });

  prompt.present();

 }

 sendAlertToEmerContact() {
  this.storage.get('contacts').then((val) => {
    if (val != null) {
      this.contact = val[0];

      let options = {
        replaceLineBreaks: false,
        android: {
          intent: ''
        }
      };

      this.sms.send(this.contact.primaryPhone, 'John Doe has initiated a call to 9-1-1. Here are some details...', options)
        .then(() => {alert("sent")});
    }
  });
 }
}
