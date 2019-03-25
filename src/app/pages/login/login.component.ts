import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController,Platform, LoadingController} from "@ionic/angular";
import {HomePage} from "../home/home.page";
import {RegisterComponent} from "../register/register.component";
import { Router } from '@angular/router';
import { Facebook } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user: SocialUser;

  constructor(public nav: NavController, public forgotCtrl: AlertController,
     public menu: MenuController, public toastCtrl: ToastController, public router: Router,
     private fb: Facebook, private platform: Platform, public alertController: AlertController,
     private nativeStorage: NativeStorage, public loadingController: LoadingController,
     private authService: AuthService) {
    this.menu.swipeEnable(false);
  }

  // go to register page
  register() {
    this.router.navigateByUrl('/register');
  }

  // login and go to home page
  login() {
    this.router.navigateByUrl('/home');
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  
  signInWithLinkedIn(): void {
    this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID);
  }  
 
  signOut(): void {
    this.authService.signOut();
  }

  async doFbLogin(){
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    //the permissions your facebook app needs from the user
    const permissions = ["public_profile", "email"];

    this.fb.login(permissions)
    .then(response => {
      let userId = response.authResponse.userID;
      //Getting name and email properties
      //Learn more about permissions in https://developers.facebook.com/docs/facebook-login/permissions

      this.fb.api("/me?fields=name,email", permissions)
      .then(user => {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        this.nativeStorage.setItem('facebook_user',
        {
          name: user.name,
          email: user.email,
          picture: user.picture
        })
        .then(() => {
          this.router.navigate(["/user"]);
          loading.dismiss();
        }, error => {
          console.log(error);
          loading.dismiss();
        })
      })
    }, error =>{
      console.log(error);
      if(!this.platform.is('cordova')){
        this.presentAlert();
      }
      loading.dismiss();
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
       message: 'Cordova is not available on desktop. Please try this in a real device or in an emulator.',
       buttons: ['OK']
     });

    await alert.present();
  }

  async presentLoading(loading) {
    return await loading.present();
  }

}
