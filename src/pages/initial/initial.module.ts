import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InitialPage } from './initial';

@NgModule({
  declarations: [
    InitialPage,
  ],
  imports: [
    IonicPageModule.forChild(InitialPage),
  ],
})
export class InitialPageModule {}
