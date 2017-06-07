import { Component } from '@angular/core';

/**
 * Generated class for the ProductComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'product',
  templateUrl: 'product.html'
})
export class ProductComponent {

  productId:number ;
  productName: string;
  productQuantity: number;
  productPrice: number;
  productSubTotal:number;
  

  constructor(id:number, name:string, quantity:number, price:number, subtotal:number) {
      this.productId = id;
      this.productName = name;
      this.productQuantity = quantity;
      this.productPrice = price;
      this.productSubTotal = subtotal;
  }
    
  public setId(id:number){
      this.productId = id;
  }
  
  public setName(name:string){
      this.productName = name;
  }


  public setQuantity(quantity:number){
      this.productQuantity = quantity;
  }
    
  public setPrice(price:number){
      this.productPrice = price;
  }
    
  public setSubtotal(subtotal:number){
      this.productSubTotal = subtotal;
  }
    
  public getId():number{
      return this.productId;
  }
  
  public getName():string{
      return this.productName;
  }


  public getQuantity():number{
      return this.productQuantity;
  }
    
  public getPrice():number{
      return this.productPrice;
  }
    
  public getSubtotal():number{
      return this.productSubTotal;
  }
    
  
    

}
