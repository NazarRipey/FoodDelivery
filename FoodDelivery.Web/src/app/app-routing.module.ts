import { ManageOrdersListComponent } from './components/order-manager/manage-orders-list/manage-orders-list.component';
import { OrderManagersComponent } from './components/admin/order-managers/order-managers.component';
import { OrderActiveListComponent } from './components/order/order-active-list/order-active-list.component';
import { OrderDetailComponent } from './components/order/order-detail/order-detail.component';
import { OrderHistoryListComponent } from './components/order/order-history-list/order-history-list.component';
import { CartDetailComponent } from './components/cart/cart-detail/cart-detail.component';
import { OwnerGuard } from './guards/owner.guard';
import { RestaurantRequestListComponent } from './components/admin/request-list/restaurant-request-list/restaurant-request-list.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { RequestListComponent } from './components/admin/request-list/request-list.component';
import { RoleGuard } from './guards/role.guard';
import { NoAccessComponent } from './components/errors/no-access/no-access.component';
import { AuthGuard } from './guards/auth.guard';
import { AddRestaurantComponent } from './components/owner/add-restaurant/add-restaurant.component';
import { ManageRestaurantsComponent } from './components/owner/manage-restaurants/manage-restaurants.component';
import { OwnerRequestListComponent } from './components/admin/request-list/owner-request-list/owner-request-list.component';
import { RestaurantDetailComponent } from './components/restaurant-detail/restaurant-detail.component';
import { RestaurantListComponent } from './components/list/restaurant-list/restaurant-list.component';
import { DishListComponent } from './components/list/dish-list/dish-list.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { LogInComponent } from './components/auth/log-in/log-in.component';
import { HomeComponent } from './components/home/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishDetailComponent } from './components/dish-detail/dish-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'login', component: LogInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'dishes', component: DishListComponent },
  { path: 'dishes/:id', component: DishDetailComponent },
  { path: 'restaurants', component: RestaurantListComponent },
  { path: 'restaurants/:name', component: RestaurantDetailComponent },
  { path: 'requests',
    component: RequestListComponent,
    canActivate: [AuthGuard, RoleGuard], 
    data: {roles: ['admin'] },
    children: [
      { path: 'owners', component: OwnerRequestListComponent },
      { path: 'restaurants', component: RestaurantRequestListComponent },
      { path: '', redirectTo: 'owners', pathMatch: 'full'}
    ],
  },
  { path: 'ordermanagers', component: OrderManagersComponent, 
    canActivate: [AuthGuard, RoleGuard],  data: {roles: ['admin'] }},
  { path: "manage", component: ManageRestaurantsComponent, 
    canActivate: [AuthGuard, OwnerGuard] },
  { path: "cart", component: CartDetailComponent, canActivate: [AuthGuard] },
  { path: "orders", component: OrderActiveListComponent,  canActivate: [AuthGuard] }, 
  { path: "orders/history", component: OrderHistoryListComponent, canActivate: [AuthGuard] },
  { path: "orders/:id", component: OrderDetailComponent, canActivate: [AuthGuard] },
  { path: "manageorders", component: ManageOrdersListComponent, 
    canActivate: [AuthGuard, RoleGuard], data: {roles: ['orderManager'] } },
  { path: "noaccess", component: NoAccessComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled",
    scrollOffset: [0, 0],
    anchorScrolling: "enabled",
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
