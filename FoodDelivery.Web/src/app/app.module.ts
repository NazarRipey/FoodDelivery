import { RestaurantRequestListComponent } from './components/admin/request-list/restaurant-request-list/restaurant-request-list.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AddDishComponent } from './components/owner/manage-restaurants-tab/add-dish/add-dish.component';
import { StartupService } from './services/startup.service';
import { GlobalHttpInterceptor } from './errors/GlobalInterceptor';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DishListComponent } from './components/list/dish-list/dish-list.component';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { NgbActiveModal, NgbCollapseModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home/home.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopRatedDishesComponent } from './components/home/home/top-rated-dishes/top-rated-dishes.component';
import { TopRatedRestaurantsComponent } from './components/home/home/top-rated-restaurants/top-rated-restaurants.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { LogInComponent } from './components/auth/log-in/log-in.component';
import { AddToCartComponent } from './components/cart/add-to-cart/add-to-cart.component';
import { ConfirmEmailComponent } from './components/auth/confirm-email/confirm-email.component';
import { RestaurantListComponent } from './components/list/restaurant-list/restaurant-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RestaurantDetailComponent } from './components/restaurant-detail/restaurant-detail.component';
import { MessageComponent } from './components/message/message.component';
import { OwnerRequestListComponent } from './components/admin/request-list/owner-request-list/owner-request-list.component';
import { FilterComponent } from './components/list/filter/filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageRestaurantsComponent } from './components/owner/manage-restaurants-tab/manage-restaurants/manage-restaurants.component';
import { AddRestaurantComponent } from './components/owner/manage-restaurants-tab/add-restaurant/add-restaurant.component';
import { UpdateRestaurantComponent } from './components/owner/manage-restaurants-tab/update-restaurant/update-restaurant.component';
import { AddAddressComponent } from './components/owner/manage-restaurants-tab/add-address/add-address.component';
import { NoAccessComponent } from './components/errors/no-access/no-access.component';
import { UpdateDishComponent } from './components/owner/manage-restaurants-tab/update-dish/update-dish.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestListComponent } from './components/admin/request-list/request-list.component';
import { EnumKeysPipe } from './pipes/enum-keys.pipe';
import { Router, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { DishDetailComponent } from './components/dish-detail/dish-detail.component';
import { CartDetailComponent } from './components/cart/cart-detail/cart-detail.component';
import { DishListItemComponent } from './components/list-items/dish-list-item/dish-list-item.component';
import { RestaurantListItemComponent } from './components/list-items/restaurant-list-item/restaurant-list-item.component';
import { ConfirmOrderComponent } from './components/order/confirm-order/confirm-order.component';
import { OrderDetailComponent } from './components/order/order-detail/order-detail.component';
import { OrderHistoryListComponent } from './components/order/order-history-list/order-history-list.component';
import { OrderActiveListComponent } from './components/order/order-active-list/order-active-list.component';
import { MinutesSecondsPipe } from './pipes/minutes-seconds.pipe';
import { UpdateOrderComponent } from './components/order/update-order/update-order.component';
import { OrderListItemComponent } from './components/order/order-list-item/order-list-item.component';
import { OrderManagersComponent } from './components/admin/order-managers/order-managers.component';
import { SearchComponent } from './components/shared/search/search.component';
import { SortDropDownComponent } from './components/shared/sort-drop-down/sort-drop-down.component';
import { StatusDropDownComponent } from './components/shared/status-drop-down/status-drop-down.component';
import { AddOrderManagerComponent } from './components/admin/order-managers/add-order-manager/add-order-manager.component';
import { ManageOrdersListComponent } from './components/order-manager/manage-orders-list/manage-orders-list.component';
import { AvailableOrdersComponent } from './components/order-manager/manage-orders-list/available-orders/available-orders.component';
import { TakenOrdersComponent } from './components/order-manager/manage-orders-list/taken-orders/taken-orders.component';
import { ManagerOrderHistoryComponent } from './components/order-manager/manage-orders-list/manager-order-history/manager-order-history.component';
import { OrderItemsComponent } from './components/order-manager/manage-orders-list/order-items/order-items.component';
import { ManageRestaurantOrdersComponent } from './components/owner/manage-restaurant-orders/manage-restaurant-orders.component';
import { RestaurantOrdersComponent } from './components/owner/manage-restaurant-orders/restaurant-orders/restaurant-orders.component';
import { ActiveOrdersComponent } from './components/owner/manage-restaurant-orders/restaurant-orders/active-orders/active-orders.component';
import { OrdersHistoryComponent } from './components/owner/manage-restaurant-orders/restaurant-orders/orders-history/orders-history.component';
import { MyProfileComponent } from './components/profile/my-profile/my-profile.component';
import { UpdateProfileComponent } from './components/profile/update-profile/update-profile.component';
import { UsersComponent } from './components/admin/users/users.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ManageRestaurantsTabComponent } from './components/owner/manage-restaurants-tab/manage-restaurants-tab.component';
import { ReadonlyRatingComponent } from './components/shared/readonly-rating/readonly-rating.component';
import { ManageOrderComponent } from './components/order-manager/manage-orders-list/manage-order/manage-order.component';
import { AwaitingOrdersComponent } from './components/owner/manage-restaurant-orders/restaurant-orders/awaiting-orders/awaiting-orders.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { OrderItemsStatusComponent } from './components/order/order-items-status/order-items-status.component';
import { StartCookingOrderComponent } from './components/owner/manage-restaurant-orders/restaurant-orders/start-cooking-order/start-cooking-order.component';
import { ManageRestaurantOrderComponent } from './components/owner/manage-restaurant-orders/restaurant-orders/manage-restaurant-order/manage-restaurant-order.component';

export function startupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    TopRatedDishesComponent,
    TopRatedRestaurantsComponent,
    DishListComponent,
    FilterComponent,
    SignUpComponent,
    LogInComponent,
    AddToCartComponent,
    ConfirmEmailComponent,
    RestaurantListComponent,
    RestaurantDetailComponent,
    MessageComponent,
    OwnerRequestListComponent,
    ManageRestaurantsComponent,
    AddRestaurantComponent,
    UpdateRestaurantComponent,
    AddAddressComponent,
    NoAccessComponent,
    AddDishComponent,
    UpdateDishComponent,
    NotFoundComponent,
    RequestListComponent,
    RestaurantRequestListComponent,
    EnumKeysPipe,
    DishDetailComponent,
    CartDetailComponent,
    DishListItemComponent,
    RestaurantListItemComponent,
    ConfirmOrderComponent,
    OrderDetailComponent,
    OrderHistoryListComponent,
    OrderActiveListComponent,
    MinutesSecondsPipe,
    UpdateOrderComponent,
    OrderListItemComponent,
    OrderManagersComponent,
    SearchComponent,
    SortDropDownComponent,
    StatusDropDownComponent,
    AddOrderManagerComponent,
    ManageOrdersListComponent,
    AvailableOrdersComponent,
    TakenOrdersComponent,
    ManagerOrderHistoryComponent,
    OrderItemsComponent,
    ManageRestaurantOrdersComponent,
    RestaurantOrdersComponent,
    ActiveOrdersComponent,
    OrdersHistoryComponent,
    MyProfileComponent,
    UpdateProfileComponent,
    UsersComponent,
    ConfirmDialogComponent,
    ManageRestaurantsTabComponent,
    ReadonlyRatingComponent,
    ManageOrderComponent,
    AwaitingOrdersComponent,
    SpinnerComponent,
    OrderItemsStatusComponent,
    StartCookingOrderComponent,
    ManageRestaurantOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbCollapseModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSliderModule,
    NgxSpinnerModule
  ],
  providers: [
    NgbActiveModal,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: GlobalHttpInterceptor, 
      multi: true 
    },
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService],
      multi: true
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }