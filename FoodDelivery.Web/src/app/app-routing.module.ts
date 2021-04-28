import { TermsOfUseComponent } from './components/legal/terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './components/legal/privacy-policy/privacy-policy.component';
import { AwaitingOrdersComponent } from './components/owner/manage-restaurant-orders/restaurant-orders/awaiting-orders/awaiting-orders.component';
import { ManageRestaurantsTabComponent } from './components/owner/manage-restaurants-tab/manage-restaurants-tab.component';
import { UsersComponent } from './components/admin/users/users.component';
import { MyProfileComponent } from './components/profile/my-profile/my-profile.component';
import { OrdersHistoryComponent } from './components/owner/manage-restaurant-orders/restaurant-orders/orders-history/orders-history.component';
import { ActiveOrdersComponent } from './components/owner/manage-restaurant-orders/restaurant-orders/active-orders/active-orders.component';
import { RestaurantOrdersComponent } from './components/owner/manage-restaurant-orders/restaurant-orders/restaurant-orders.component';
import { ManageRestaurantOrdersComponent } from './components/owner/manage-restaurant-orders/manage-restaurant-orders.component';
import { ManagerOrderHistoryComponent } from './components/order-manager/manage-orders-list/manager-order-history/manager-order-history.component';
import { TakenOrdersComponent } from './components/order-manager/manage-orders-list/taken-orders/taken-orders.component';
import { AvailableOrdersComponent } from './components/order-manager/manage-orders-list/available-orders/available-orders.component';
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
import { ManageRestaurantsComponent } from './components/owner/manage-restaurants-tab/manage-restaurants/manage-restaurants.component';
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
  { 
    path: 'requests',
    component: RequestListComponent,
    canActivate: [AuthGuard, RoleGuard], 
    data: {roles: ['admin'] },
    children: [
      { path: 'owners', component: OwnerRequestListComponent },
      { path: 'restaurants', component: RestaurantRequestListComponent },
      { path: '', redirectTo: 'owners', pathMatch: 'full'}
    ],
  },
  { 
    path: 'ordermanagers',
    component: OrderManagersComponent, 
    canActivate: [AuthGuard, RoleGuard],  
    data: {roles: ['admin'] }
  },
  { 
    path: 'users', 
    component: UsersComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: {roles: ['admin'] }
  },
  { 
    path: "manage", 
    component: ManageRestaurantsTabComponent, 
    canActivate: [AuthGuard, OwnerGuard],
    children : [
      { 
        path: ':name', 
        component: ManageRestaurantsComponent,
        canActivate: [RoleGuard],
        data: {roles: ['owner'] }
      },
    ] 
  },
  { 
    path: "cart", 
    component: CartDetailComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: {roles: ['customer'] } 
  },
  { 
    path: "orders", 
    component: OrderActiveListComponent, 
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: ['customer'] }  
  }, 
  { 
    path: "orders/history", 
    component: OrderHistoryListComponent, 
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: ['customer'] }  
  },
  { 
    path: "orders/:id", 
    component: OrderDetailComponent, 
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: ['customer'] }  
  },
  { 
    path: "manageorders", 
    component: ManageOrdersListComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: {roles: ['orderManager'] }, 
    children: [
      { path: 'available', component: AvailableOrdersComponent },
      { path: 'taken', component: TakenOrdersComponent },
      { path: 'history', component: ManagerOrderHistoryComponent },
      { path: '', redirectTo: 'available', pathMatch: 'full'}
    ]
  },
  {
    path: "restaurantorders",
    component: ManageRestaurantOrdersComponent,
    canActivate: [AuthGuard, OwnerGuard], 
    children : [
      { 
        path: ':name', 
        component: RestaurantOrdersComponent,
        children : [
          { path: 'awaiting', component: AwaitingOrdersComponent },
          { path: 'active', component: ActiveOrdersComponent },
          { path: 'history', component: OrdersHistoryComponent },
          { path: '', redirectTo: 'awaiting', pathMatch: 'full'}
        ]
      },
    ]
  },
  { 
    path: "profile", 
    component: MyProfileComponent, 
    canActivate: [AuthGuard],
  },
  { path: "privacy", component: PrivacyPolicyComponent },
  { path: "terms", component: TermsOfUseComponent },
  { path: "noaccess", component: NoAccessComponent },
  { path: "notfound", component: NotFoundComponent },
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
