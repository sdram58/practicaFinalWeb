import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { OrderDetailPage } from '../order-detail/order-detail';
import { DeliverTimePage } from '../deliver-time/deliver-time';
import { ProductListPage } from '../product-list/product-list';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { OrderServiceProvider } from '../../providers/order-service/order-service';

/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private orderService: OrderServiceProvider,
              private authService: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }
    
    
 logOut(){
     this.authService.logOut();
     this.navCtrl.popToRoot();
 }
    
 goDeliverTime(){
     this.navCtrl.push(DeliverTimePage);
 }
    
 goAboutPage(){
     this.navCtrl.push(AboutPage);
 }
    
 goOrderDetail(){
     this.navCtrl.push(OrderDetailPage);
 }
    
 goProducList(){
     this.navCtrl.push(ProductListPage);
 }
    
 hasOrders(){
     return true;
 }
    
 getUserLogged(){
     return this.authService.getUserLogged();
 }
}
