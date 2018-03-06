import { Component } from '@angular/core';

import { AccountPage } from '../account/account';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ConditionPage } from '../condition/condition';
import { MapPage } from '../map/map';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ContactPage;
  tab3Root = AccountPage;
  tab4Root = ConditionPage;
  tab5Root = MapPage;

  constructor() {

  }
}
