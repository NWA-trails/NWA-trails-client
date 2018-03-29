import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage'

import { MapPage } from '../pages/map/map';
import { TabsPage } from '../pages/tabs/tabs';
import { AccountPage } from '../pages/account/account';
import { ConditionPage } from '../pages/condition/condition';
import { EmergencyContactsPage } from "../pages/emergency-contacts/emergency-contacts";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Camera } from '@ionic-native/camera';
import { CallNumber } from '@ionic-native/call-number';
import { File } from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';
import { HTTP } from '@ionic-native/http';
import { HttpClientModule } from '@angular/common/http';
import { LongPressModule } from 'ionic-long-press';
import { SMS } from '@ionic-native/sms';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    AccountPage,
    ConditionPage,
    MapPage,
    EmergencyContactsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    LongPressModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    AccountPage,
    ConditionPage,
    MapPage,
    EmergencyContactsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AndroidPermissions,
    Camera,
    Geolocation,
    CallNumber,
    SMS,
    File,
    HTTP,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
