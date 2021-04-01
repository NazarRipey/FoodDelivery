import { RestaurantRequestListComponent } from './components/admin/request-list/restaurant-request-list/restaurant-request-list.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AddDishComponent } from './components/owner/add-dish/add-dish.component';
import { StartupService } from './services/startup.service';
import { GlobalHttpInterceptor } from './errors/globalInterceptor';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DishListComponent } from './components/list/dish-list/dish-list.component';
import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { ManageRestaurantsComponent } from './components/owner/manage-restaurants/manage-restaurants.component';
import { AddRestaurantComponent } from './components/owner/add-restaurant/add-restaurant.component';
import { UpdateRestaurantComponent } from './components/owner/update-restaurant/update-restaurant.component';
import { AddAddressComponent } from './components/owner/add-address/add-address.component';
import { NoAccessComponent } from './components/errors/no-access/no-access.component';
import { UpdateDishComponent } from './components/owner/update-dish/update-dish.component';
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
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }