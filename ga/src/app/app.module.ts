import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './core/dataservices/data.service';
import { Camera } from '@ionic-native/camera/ngx';
import { LogoutComponent } from './logout/logout.component';
import { TncComponent } from './tnc/tnc.component';
import { Utility } from './core/utility';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    TncComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataService,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Utility
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
