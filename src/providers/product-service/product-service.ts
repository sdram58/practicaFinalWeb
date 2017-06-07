import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProductServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProductServiceProvider {

private productUrl = 'http://multimedia.uoc.edu/frontend/getproducts.php';
private detailUrl = 'http://multimedia.uoc.edu/frontend/productdetail.php';
private productList:any =[];
private productDetail:any;

  constructor(public http: Http) {
    console.log('Hello ProductServiceProvider Provider');
  }
    

  /*
    Funcion que dado un numero de página nos devuelve los productos de esa página
    Y los añadimos a los productos
  */
  getProducts(pageNumber):Observable<Response>{
      if(!pageNumber || isNaN(pageNumber)){
          pageNumber=1;
      }
      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
      let body = 'page=' + pageNumber;
      let options = new RequestOptions({ headers: headers });
      
      return this.http.post(this.productUrl, body, options);
            
    }
    
 /*
 Funcion que dado un ID nos devuelve un producto o null en caso contrario
 */
  getProductById(id){
      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
      let body = 'id=' + id;
      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.detailUrl, body, options)
          .map(res => res.json());         
    
  }
    
    

  

}
