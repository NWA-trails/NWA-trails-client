import { Component } from '@angular/core';
import { NavController, Platform, ToastController, AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Storage } from '@ionic/storage';
import leaflet from "leaflet";
import { File } from '@ionic-native/file';
import { HTTP } from '@ionic-native/http';
import { contactDetails } from './contactDetails';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: leaflet.Map;
  isEmergencyCallEnabled: boolean = false;
  buttonColor: string = 'default';
  contact: contactDetails;



  constructor(public navCtrl: NavController, private callNumber: CallNumber, private file: File, private platform: Platform, 
              private http: HTTP, public toastCtrl: ToastController, private storage: Storage, public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    this.loadLeafletMap();
  }

  onLocationFound(e) {
    console.log("locations found");
    var radius = e.accuracy / 2;
    if(this.map == undefined) console.log("map is undefined");
    leaflet.circle(e.latlng, radius).addTo(this.map);
}

onLocationError(e) {
    console.log("Cannot find location.")
    alert(e.message);
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
    });
    //test to see if it works...checks out
    //var tailFeaturesCollection = {"type":"Feature","id":3,"geometry":{"type":"Point","coordinates":[-94.2176600832399,36.4118875806067]},"properties":{"objectid":3,"id":35,"milepost":35.000031,"city":"Bentonville","county":"Benton","y_coord":36.411881,"x_coord":-94.217653,"gps_x":"94° 13' 3.551\" W","gps_y":"36° 24' 42.772\" N","mile_marker":"Greenway Mile Marker: 35","mlabel":35}};
//
    //this.http.get('../../assets/GeoJSON/trailJSON.geojson').map

    this.file.readAsText(this.file.applicationDirectory +'www/assets/GeoJSON','example.geojson')
    .then((geoData) => {

      var trailFeaturesCollection = JSON.parse(geoData);


    this.addFeatureToMap(trailFeaturesCollection);
    }).catch(err => alert(err));








    //on('locationfound', this.onLocationFound).on('locationerror', this.onLocationError);
  }

  addFeatureToMap(feature)
  {
     leaflet.geoJSON(feature).addTo(this.map);
  }

  onTouch() {
    this.buttonColor = 'danger';
  }

  initEmergencyCall() {
    this.buttonColor = 'secondary';

    if (!this.isEmergencyCallEnabled) {
      this.isEmergencyCallEnabled = true;
      this.verifyEmergencyCall();
    }
  }

  onRelease() {
    this.buttonColor = 'default';
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
      
      let toast = this.toastCtrl.create({
        message: 'Sending info to: ' + this.contact.contactName + '  ' + this.contact.primaryPhone,
        duration: 2000,
        position: 'top'
      });
    
      toast.present();
    }
  });
 }
}
