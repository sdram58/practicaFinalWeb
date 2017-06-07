import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthServiceProvider {
    private logged:Boolean = false;
    private urlAuth:String = 'http://multimedia.uoc.edu/frontend/auth.php';
    
    private userLogged = "";
    

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }
    
    login(infouser):Observable<Boolean>{
        //Comprobamos antes de enviar la petición si alguno de los campos está vacío.
        if((!infouser.user) || (!infouser.passwd)){
          return Observable.create(obs => {
              obs.next(false);
              obs.complete();
          });
        } 
        
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let body = 'user=' + infouser.user + '&passwd=' + infouser.passwd;
        let options = new RequestOptions({ headers: headers });
        return new Observable(
            obs =>{
                this.http.post(this.urlAuth.toString(), body, options)
                    .map(res => res.json())
                    .subscribe(res =>{
                if(res.status.toString()==="OK"){
                    this.setUserLogged(infouser.user);
                    this.logged = true;                
                }else{
                    this.logged = false;
                }                
                obs.next(this.logged);
                obs.complete();
            },
            error => {
                 this.logged = false;
                 obs.next(false);
                 obs.complete();
            },
            ()=>{
                obs.complete();
            }
        )}      
        );
    }
    
    
    isLogged(){
        return this.logged;
    }
        
    logOut(){
        this.logged = false;
    }

    setUserLogged(username:string){
        this.userLogged = username;
    }
    
    getUserLogged():string{
        return this.userLogged;
    }

}
