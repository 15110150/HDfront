import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabComponent } from './tab.component';
import { HomePage } from '../home/home.page';
import { SearchComponent } from '../search/search.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

const routes: Routes = [
   
    {
        path: '',
        component: TabComponent,
        children: [
           
            {
                path: 'home',
                loadChildren: '../../pages/home/home.module#HomePageModule'
                //component: HomePage,
            },
            // {
            //     path: 'search',
            //     loadChildren: '../search/search.module#SearchComponentModule'
                
            //    // component: SearchComponent,
            // },
            {
                path: 'userProfile',
                //loadChildren: ''
                
                component: UserProfileComponent,
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'home'
            }
        ]
    }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabPageRoutingModule { }