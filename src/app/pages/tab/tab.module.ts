import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabComponent } from './tab.component';
import { TabPageRoutingModule } from './tab.routing.module';
import { HomePageModule } from '../home/home.module';
import { UserProfileComponentModule } from '../user-profile/user-profile.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabPageRoutingModule,
    HomePageModule,
    UserProfileComponentModule ,
  ],
  declarations: [TabComponent]
})
export class TabComponentModule { }
