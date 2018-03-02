import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmergencyContactsPage } from './emergency-contacts';

@NgModule({
  declarations: [
    EmergencyContactsPage,
  ],
  imports: [
    IonicPageModule.forChild(EmergencyContactsPage),
  ],
})
export class EmergencyContactsPageModule {}
