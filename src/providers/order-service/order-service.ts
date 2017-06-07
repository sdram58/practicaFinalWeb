import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ProductComponent} from '../../components/product/product';
import { AuthServiceProvider } from '../auth-service/auth-service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';

/*
  Generated class for the OrderServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class OrderServiceProvider {
    
  existOrder:Boolean = false;
  orderProducts:Array<ProductComponent>;
  PERSISTENT_USER_KEY:string; 
    
    
  constructor(private authService : AuthServiceProvider) {
     console.log('Hello OrderServiceProvider Provider');
      //creamos una clave con el nombre del usuario;
     this.PERSISTENT_USER_KEY = authService.getUserLogged();
      
     //this.removeOrder();
     this.orderProducts = this.getUserOrder() || [];
      console.log("Arranca el servicio Ordenes: " + this.PERSISTENT_USER_KEY);
      console.log(this.orderProducts);
  }


  /*
  * Función que comprueba si hay productos, es decir, existe y tiene al menos un producto.
  */
  hasProducts():Boolean{
      this.orderProducts = this.getUserOrder() || [];
      return this.orderProducts.length>0?true : false;
  }


  /*
  * Devuelve los datos persistidos del usuario actual
  */
  getUserOrder():Array<ProductComponent>{
//      new Observable(observer => {
//          var data = JSON.parse(window.localStorage[this.PERSISTENT_USER_KEY] || '[]');
//          observer.next(data);
//          observer.complete();
//      }).subscribe(res =>{
//            this.orderProducts = JSON.parse(res);
//        });  
      return JSON.parse(window.localStorage[this.PERSISTENT_USER_KEY] || '[]');
  }
    
 /*
 * Función que mira si hay algún pedido persisitdo y lo devuelve.
 */
  getUserOrderProvider(){
      this.orderProducts = this.getUserOrder() || [];
      return this.orderProducts;
  }
                            

  setUser(username:string){
      this.PERSISTENT_USER_KEY = username;
  }

  persistUserOrder(){
//      new Observable(observer => {
//          window.localStorage[this.PERSISTENT_USER_KEY] =  JSON.stringify(this.orderProducts);
//          observer.next(this.orderProducts);
//          observer.complete();
//      }).subscribe(res =>{
//            console.log(res);
//        });
      window.localStorage[this.PERSISTENT_USER_KEY] =  JSON.stringify(this.orderProducts);
  }

  getNumOrders():number{
      var num=0;
      for(var i = 0;i< this.orderProducts.length;i++){
      num += this.orderProducts[i].productQuantity;
      }
      return num;
  }
    
  /*
  * dado un producto lo actualizamos si existo o lo añadimos sino
  */
  productSave(product:ProductComponent){
      var esta = false;
      for(var i = 0; i< this.orderProducts.length; i++){
          if(product.productId === this.orderProducts[i].productId){
              esta = true;
              this.orderProducts[i].productName = product.productName;
              this.orderProducts[i].productQuantity = product.productQuantity;
              this.orderProducts[i].productPrice = product.productPrice;
              this.orderProducts[i].productSubTotal = product.productSubTotal;
              break;
          }
      }
      if(!esta){
          this.orderProducts.push(product);
      }
      
      this.persistUserOrder();
  }
    
    /*
    * Deja de persistir el pedido en curso
    */
    removeOrder(){
        localStorage.removeItem(this.PERSISTENT_USER_KEY); 
    }
    
    /*
    * Devuelve la cantidad total del pedido en curso
    */
    getTotalAmount(){
        var num=0;
          for(var i = 0;i< this.orderProducts.length;i++){
              num += this.orderProducts[i].productSubTotal;
          }
        return num.toFixed(2);
    }
    

    /*
    *Elimina un producto dado su id
    */
    dropProductById(id:number){
        console.log("Entra en drop con id: " + id);
        for(var i = 0; i< this.orderProducts.length; i++){
          if(id == this.orderProducts[i].productId){
             this.orderProducts.splice(i, 1);
              //Guarda los datos
              this.persistUserOrder();
              //Si era la última orden dejamos de persistir
              if(this.orderProducts.length<1){
                  this.removeOrder();
              }
              break;
          }
      }
    }
    
    
    /*
    * Funcion que incrementa la cantidad en 1 de un producto dado su id
    */
    incProductQuantity(id:number){        
         for(var i = 0; i< this.orderProducts.length; i++){
          if(id == this.orderProducts[i].productId){
             this.orderProducts[i].productQuantity++;
              //Actualizamos subtotal
              this.orderProducts[i].productSubTotal = this.orderProducts[i].productPrice * this.orderProducts[i].productQuantity;
              //Guardamos los datos
              this.persistUserOrder();
              break;
          }
      }
    }
    
    /*
    * Funcion que decrementa la cantidad en 1 de un producto dado su id
    */
    decProductQuantity(id:number){
         for(var i = 0; i< this.orderProducts.length; i++){
          if(id == this.orderProducts[i].productId){
              if(this.orderProducts[i].productQuantity > 1){
                  this.orderProducts[i].productQuantity--;
                  //Actualizamos subtotal
                  this.orderProducts[i].productSubTotal = this.orderProducts[i].productPrice * this.orderProducts[i].productQuantity;
                  //Guardamos los datos
                  this.persistUserOrder();
              }
             
              break;
          }
      }
    }

}
