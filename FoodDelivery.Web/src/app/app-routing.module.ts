import { RestaurantListComponent } from './list/restaurant-list/restaurant-list.component';
import { DishListComponent } from './list/dish-list/dish-list.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { HomeComponent } from './home/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'login', component: LogInComponent },
  { path: 'signup', component: SignUpComponent },
  { 
    path: 'list', 
    component: ListComponent,
    children: [
      { path: ' ', redirectTo: 'dishes'},
      { path: 'dishes', component: DishListComponent },
      { path: 'restaurants', component: RestaurantListComponent }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
