import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliverTimePage } from './deliver-time';

@NgModule({
  declarations: [
    DeliverTimePage,
  ],
  imports: [
    IonicPageModule.forChild(DeliverTimePage),
  ],
  exports: [
    DeliverTimePage
  ]
})
export class DeliverTimePageModule {}
