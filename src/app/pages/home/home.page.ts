import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  profile:any=null;

  constructor(
    private authService:AuthService,
    private avatarService:AvatarService,
    private router:Router,
    private alertCtrl: AlertController,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController
  ) {}
   
  go() {
    this.router.navigate(['/Login']);
  }
  
  NgOnInit()
  {
    this.loadProfile();
  }
   
  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/',{replaceUrl:true})
  }

  loadProfile(){
    this.avatarService.getUserProfile().subscribe(respuesta => {
      this.profile = respuesta;
    })
  }

  async uploadAvatar(){
    const avatar = await Camera.getPhoto({
      quality:90,
      allowEditing:false,
      resultType: CameraResultType.Base64,
      source:CameraSource.Camera,
    });
    console.log(avatar);

    if(avatar){
      const loading = await this.loadingCtrl.create();
      await loading.present();
      const respuesta = await this.avatarService.uploadAvatar(avatar);
      await loading.dismiss();

      if(respuesta){
        this.toasPresent('Upload success');
      }
      else{
        this.alertPresent('Upload failed','Please try again');
      }
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

  async toasPresent(message:string){
    const toast = await this.toastCtrl.create({
      message:message,
      duration:1000,
    });
    await toast.present();
  }

}
