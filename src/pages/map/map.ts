import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import leaflet from "leaflet";

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: leaflet.Map;



  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.loadLeafletMap();
  }

  loadLeafletMap(){
    this.map = leaflet.map('mapId');
    leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'edupala.com © ionic LeafLet'
    }).addTo(this.map);
    this.map.locate({setView: true, maxZoom: 13});
  }
}
