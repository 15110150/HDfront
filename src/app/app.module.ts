import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule, SwUpdate, SwPush } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {APP_BASE_HREF} from '@angular/common';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AccountComponent } from './pages/account/account.component';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from "angularx-social-login";
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("Google-OAuth-Client-Id")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("653554271768899")
  },
  {
    id: LinkedInLoginProvider.PROVIDER_ID,
    provider: new LinkedInLoginProvider("LinkedIn-client-Id", false, 'en_US')
  }
]);
export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    SocialLoginModule,
    HttpClientModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    NativeStorage,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: APP_BASE_HREF, useValue : '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(update: SwUpdate, push: SwPush){
    update.available.subscribe(update=>{
      console.log("update available");
    })
  }
}
