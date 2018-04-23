import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmergencyInformationDisplayPage } from './emergency-information-display';

@NgModule({
  declarations: [
    EmergencyInformationDisplayPage,
  ],
  imports: [
    IonicPageModule.forChild(EmergencyInformationDisplayPage),
  ],
})
export class EmergencyInformationDisplayPageModule {}
