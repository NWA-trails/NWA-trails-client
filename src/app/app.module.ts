import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage'
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { MapPage } from '../pages/map/map';
import { TabsPage } from '../pages/tabs/tabs';
import { AccountPage } from '../pages/account/account';
import { ConditionPage } from '../pages/condition/condition';
import { PointsPage } from '../pages/points/points';
import { EmergencyContactsPage } from "../pages/emergency-contacts/emergency-contacts";
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { InitialPage } from "../pages/initial/initial";
import { EmergencyInformationDisplayPage } from "../pages/emergency-information-display/emergency-information-display";

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
import { AuthenticationServiceProvider } from '../providers/authentication-service/authentication-service';

export class CustomHammerConfig extends HammerGestureConfig {
  overrides =  {
    'press': {time: 3000}
  }
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    AccountPage,
    ConditionPage,
    PointsPage,
    MapPage,
    EmergencyContactsPage,
    RegisterPage,
    InitialPage,
    EmergencyInformationDisplayPage
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
    PointsPage,
    MapPage,
    EmergencyContactsPage,
    RegisterPage,
    InitialPage,
    EmergencyInformationDisplayPage,
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
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
    AuthenticationServiceProvider
  ]
})
export class AppModule { }
