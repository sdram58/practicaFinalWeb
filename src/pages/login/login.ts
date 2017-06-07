import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { MainPage } from '../main/main';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    loading: Loading;
    datos = {};
    
  public loginForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  });
    
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public fb: FormBuilder,
              public alertCtrl: AlertController, 
              private loadingCtrl: LoadingController, 
              private authService: AuthServiceProvider) {
  }

  ionViewDidLoad() {    
    console.log('ionViewDidLoad LoginPage');
  }
    
  doLogin(event) {
    this.showLoading();
    console.log(event);
    var infoUser = {"user":this.loginForm.value.email, "passwd":this.loginForm.value.password};
    //Borramos los valores de los inputs  
    this.loginForm.reset();
      
    //Hacemos la llamada al provider y suscribimos en espera de su respuesta
    this.authService.login(infoUser).subscribe(validLogin =>{
            if(validLogin){
                this.navCtrl.push(MainPage);
            }else{
                this.showErrorMessage("Incorrect user or password!");
            }
        },
        error =>{
            console.log("Error");
            this.showErrorMessage(error);
        });
  }

  //Funcion que mostrará un mensaje de espera por si la comprobación se demora mucho.
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Checking!!\n Please wait...!',
      dismissOnPageChange: true //Desaparece al cambiar de pantalla
    });
    this.loading.present();
  }

  showErrorMessage(textError:string){
    this.loading.dismiss();

    this.alertCtrl.create({
      title: 'Login Error',
      subTitle: textError,
      buttons: ['OK']
    }).present(prompt);
  }

}