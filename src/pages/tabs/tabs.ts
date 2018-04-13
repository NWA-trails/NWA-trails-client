import { Component } from '@angular/core';

import { AccountPage } from '../account/account';
import { ConditionPage } from '../condition/condition';
import { PointsPage } from '../points/points';
import { MapPage } from '../map/map';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapPage;
  tab2Root = ConditionPage;
  tab3Root = PointsPage;
  tab4Root = AccountPage;
  
  constructor() {

  }
}
