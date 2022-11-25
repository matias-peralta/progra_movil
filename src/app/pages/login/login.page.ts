import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private authService: AuthService,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController,
    private router:Router
  ){ }

  go(){
    this.router.navigateByUrl('/home');
  }

  credentials!: FormGroup;

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.credentials = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
    });
  }

  get email(){
    return this.credentials.get('email');
  }

  get password(){
    return this.credentials.get('password');
  }

  async login(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const user = await this.authService.login(this.credentials?.value.email,this.credentials?.value.password);
    await loading.dismiss();
    
    if(user){
      this.router.navigateByUrl('/home',{replaceUrl:true});
    }
    else{
      this.alertPresent('Login failed','Please try again!!!');
    }
  }

  async register(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const user = await this.authService.register(this.credentials?.value.email,this.credentials?.value.password);
    await loading.dismiss();
    
    if(user){
      this.router.navigateByUrl('/home',{replaceUrl:true});
    }
    else{
      this.alertPresent('Register failed','Please try again!!!');
    }
  }
  
  async alertPresent(header:string,message:string){
    const alert = await this.alertCtrl.create({
      header:header,
      message:message,
      buttons:['OK']
    });
    await alert.present();
  }

}
