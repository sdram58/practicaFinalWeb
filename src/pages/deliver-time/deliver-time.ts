import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OrderDetailPage } from '../order-detail/order-detail';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { ProductComponent } from '../../components/product/product';

/**
 * Generated class for the DeliverTimePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-deliver-time',
  templateUrl: 'deliver-time.html',
})
export class DeliverTimePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private orderService: OrderServiceProvider,
              private authService: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliverTimePage');
  }
    
    goOrderDetail(){
        this.navCtrl.push(OrderDetailPage)
    }

}
