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
import * as  trailJSON  from "../../assets/GeoJSON/trailJSON.json";



@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: leaflet.Map;
  isEmergencyCallEnabled: boolean = false;
  buttonColor: string = 'default';
  contact: contactDetails;
  colorIterator: number = 0;
  mapIsLoaded: boolean = false;



  constructor(public navCtrl: NavController, private callNumber: CallNumber, private file: File, private http: HttpClient,
              public toastCtrl: ToastController, private storage: Storage, public alertCtrl: AlertController,
              private sms: SMS) {}

  ionViewDidLoad() {
    if(this.map == undefined) {
      this.loadLeafletMap();
    }
  }

  loadLeafletMap(){
    if(!this.mapIsLoaded) {
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

      this.addFeatureToMap(trailJSON);

      this.mapIsLoaded = true;
    }
  }

  addFeatureToMap(geoJSON)
  {
    var _this = this;
    var trailFeatures = leaflet.geoJSON(geoJSON, {
      onEachFeature: this.addPopUpToFeature,
      style: function (feature) {
        _this.colorIterator += 1;
        switch (_this.colorIterator % 6) {
            case 0: return {color: "#202EF2", weight: 7};
            case 1: return {color: "#46c3b6", weight: 7};
            case 2: return {color: "#092e34", weight: 7};
            case 3: return {color: "#737CF6", weight: 7};
            case 4: return {color: "#949494", weight: 7};
            case 5: return {color: "#51d5e8", weight: 7};
        }
      }
    }).addTo(this.map);
  }

  addPopUpToFeature(feature, layer) {
    if(feature.properties.mile_marker == undefined) {
      if(feature.properties.first_surftype) {
        layer.bindPopup('<h1>'+feature.properties.first_prim_name+'</h1>'+
        '<p>Segment: '+feature.properties.first_seg_name+'</p>'+
        '<p>Surface Type: '+feature.properties.first_surftype+'</p>'+
        '<p>Length: '+feature.properties.first_trlmiles.toFixed(2)+' mi</p>');
      } else {
        layer.bindPopup('<h1>'+feature.properties.first_prim_name+'</h1>'+
        '<p>Segment: '+feature.properties.first_seg_name+'</p>'+
        '<p>Length: '+feature.properties.first_trlmiles.toFixed(2)+' mi</p>');
      }
    } else {
      layer.bindPopup('<h1>'+feature.properties.mile_marker+'</h1>'+
      '<p>Latitude: '+feature.properties.gps_y+'</p>'+
      '<p>Longitude: '+feature.properties.gps_x+'</p>');
    }
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
            message: 'Emergency Call Canceled.',
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
