import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { OrderDetailPage } from '../order-detail/order-detail';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { ProductComponent } from '../../components/product/product';


/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
    private product:any = "";

  constructor(
    public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public navParams: NavParams, 
    private alertCtrl: AlertController,
    private orderService: OrderServiceProvider, 
    private productService: ProductServiceProvider,
    private authService: AuthServiceProvider) {
        
      let idProducto = this.navParams.get("idProduct");
        
        //Al crearse pedidmos los datos del pedido dado un id
      productService.getProductById(idProducto).subscribe(
          res => {              
              if(res.status){
                  this.showMessage("The request product hasn't been found!");
              }else{
                  this.product = res;
              }
          }
      );
      
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
    
    /*
    *Función para mostrar un mensaje
    */
    showMessage(msg:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      showCloseButton:true,
      closeButtonText: 'OK',
      //duration: 3000
    });
    toast.present();
  }
    
    
    /*
    * Función que añade una cantidad de producto al carrito
    */
    addToCart(quantity:number){
        console.log(quantity);
        let price = this.product.product_price.trim().slice(0,-1).replace(",",".");
        let subtotal:number = price * 1 * quantity;
        console.log("precio  " + price + " + cantidad= " + quantity + " = Subtotal = " + subtotal);
        var mProduct = new ProductComponent(this.product.id,this.product.product_name, quantity, price, subtotal);
        this.orderService.productSave(mProduct);
        this.showMessage(quantity + " product(s) has been saved!");
    }
    
    /*
    *Función que dirige a la página de detalle del pedido.
    */
    goOrderDetail(){
        this.navCtrl.push(OrderDetailPage)
    }

}
