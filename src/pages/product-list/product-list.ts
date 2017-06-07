import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { DetailPage } from '../detail/detail';
import { MainPage } from '../main/main';
import { OrderDetailPage } from '../order-detail/order-detail';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { OrderServiceProvider } from '../../providers/order-service/order-service';

/**
 * Generated class for the ProductListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

   private mProducts:Array<any> = [];
   private isLastPage=false;
   
   private indexPage=1;
    

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private productProvider: ProductServiceProvider, 
              private alertCtrl: AlertController, private orderService: OrderServiceProvider,
              private authService: AuthServiceProvider) {
      console.log("Entra en ListaProductos");
      this.getProducts(this.indexPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }
    

    /*
    *Función que llama al servicio que devuelve todos los productos
    */
  public getProducts(numPage){
      this.productProvider.getProducts(numPage)
      .map(res => res.json())
            .subscribe(res =>{
                if(res.status){
                    console.log(res.message);
                    this.isLastPage = true;
                    this.showMessage("There's no more products to show","No more products");
                }else{  
                    for (var i=0;i<res.length;i++){
                            this.mProducts.push({
                                "id":res[i].id, 
                                "product_name":res[i].product_name, 
                                "image":res[i].product_image,
                                "price":res[i].product_price,
                                "weight":res[i].product_dosage
                            });
                    }                  
                }                       
            },
            error => {
                return null;
            },
            ()=>{
                console.log("Finalizado servicio entrega productos");
            }                 
        );

  }


    /*
    *Funcion que cambia el número de página a pedir
    */
    public getNextPage(){
        if(!this.isLastPage){
            this.indexPage++;
            this.getProducts(this.indexPage);
        }else{
            this.showMessage("There's no more products to show","No more products");
        }
    }
    
    /*
    *Funcion que muestra un mensaje por pantalla
    */
    showMessage(text:string, title:string){
        this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['OK']
        }).present(prompt);
      }
    
    /*
    *Función que va a la página de detalle del producto dado su id
    */
    goProductDetail(productId){
        this.navCtrl.push(DetailPage,{idProduct:productId});
    }
    
    /*
    *Función que va a la página de detalle del pedido
    */
    goOrderDetail(){
        this.navCtrl.push(OrderDetailPage)
    }

    /*
    *Función que va a la página del menú principal
    */
    goMainMenu(){
        this.navCtrl.push(MainPage);
    }

}
