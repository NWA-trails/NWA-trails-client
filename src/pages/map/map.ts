import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import leaflet from "leaflet";
import { File } from '@ionic-native/file';
import { HTTP } from '@ionic-native/http';



@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: leaflet.Map;



  constructor(public navCtrl: NavController, private callNumber: CallNumber, private file: File, private platform: Platform, private http: HTTP) {}

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

  emergencyCall() {
    var phoneNumber = "469-955-1980";
    console.log("emergency call");
    this.callNumber.callNumber(phoneNumber, true)
      .then(() => console.log('Launched dialer: '+phoneNumber))
      .catch(() => console.log('Error launching dialer'));

 }




}
