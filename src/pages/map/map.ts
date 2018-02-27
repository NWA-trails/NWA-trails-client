import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import leaflet from "leaflet";

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: leaflet.Map;



  constructor(public navCtrl: NavController, private callNumber: CallNumber) {}

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
    leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'edupala.com © ionic LeafLet'
    }).addTo(this.map);

    this.map.locate({
      setView:true,
      maxZoom:15
    });
    //on('locationfound', this.onLocationFound).on('locationerror', this.onLocationError);
  }

  emergencyCall() {
    var phoneNumber = "469-955-1980";
    console.log("emergency call");
    this.callNumber.callNumber(phoneNumber, true)
      .then(() => console.log('Launched dialer: '+phoneNumber))
      .catch(() => console.log('Error launching dialer'));

 }




}
