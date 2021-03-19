import { RoleGuard } from './guards/role.guard';
import { NoAccessComponent } from './components/errors/no-access/no-access.component';
import { AuthGuard } from './guards/auth.guard';
import { AddRestaurantComponent } from './components/owner/add-restaurant/add-restaurant.component';
import { ManageRestaurantsComponent } from './components/owner/manage-restaurants/manage-restaurants.component';
import { OwnerRequestListComponent } from './components/admin/owner-request-list/owner-request-list.component';
import { NoServerConnectionComponent } from './components/errors/no-server-connection/no-server-connection.component';
import { RestaurantDetailComponent } from './components/restaurant-detail/restaurant-detail.component';
import { RestaurantListComponent } from './components/list/restaurant-list/restaurant-list.component';
import { DishListComponent } from './components/list/dish-list/dish-list.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { LogInComponent } from './components/auth/log-in/log-in.component';
import { HomeComponent } from './components/home/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'login', component: LogInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'dishes', component: DishListComponent },
  { path: 'restaurants', component: RestaurantListComponent },
  { path: 'restaurants/:name', component: RestaurantDetailComponent },
  { path: 'requests', component: OwnerRequestListComponent,
   canActivate: [RoleGuard], data: {roles: ['admin'] }  },
  { path: "noconnection", component: NoServerConnectionComponent },
  { path: "manage", component: ManageRestaurantsComponent, 
    canActivate: [RoleGuard], data: {roles: ['owner'] } },
  { path: "noaccess", component: NoAccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
