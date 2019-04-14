import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
  { path: 'account', loadChildren: './pages/account/account.module#AccountComponentModule' },
  { path: 'booking', loadChildren: './pages/booking/booking.module#BookingComponentModule' },
  { path: 'map', loadChildren: './pages/map/map.module#MapComponentModule' },
  { path: 'search',  loadChildren: '../search/search.module#SearchComponentModule'},
  { path: '', loadChildren: './pages/tab/tab.module#TabComponentModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
