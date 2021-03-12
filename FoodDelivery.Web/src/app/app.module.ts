import { StartupService } from './services/startup.service';
import { userHelper } from './helpers/userHelper';
import { GlobalHttpInterceptor } from './errors/globalInterceptor';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DishListComponent } from './components/list/dish-list/dish-list.component';
import { Restaurant } from './models/restaurant';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './components/filter/filter.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { LogInComponent } from './components/auth/log-in/log-in.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { ConfirmEmailComponent } from './components/auth/confirm-email/confirm-email.component';
import { RestaurantListComponent } from './components/list/restaurant-list/restaurant-list.component';
import { Dish } from './models/dish';
import { NgxPaginationModule } from 'ngx-pagination';
import { RestaurantDetailComponent } from './components/restaurant-detail/restaurant-detail.component';
import { MessageComponent } from './components/auth/message/message.component';
import { NoServerConnectionComponent } from './components/errors/no-server-connection/no-server-connection.component';

export function startupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}

/*hardcoded data*/
export const serverUrl = 'https://localhost:44325/';

export const restaurants : Restaurant[] = [
  { id:1, name: "McDonald's", description: "Cheap and fast",
   imgSource: "assets/images/restaurants/mcdonalds.jpg", rating: 5},
  { id:2, name: "Cozy", description: "Cozy and moderate",
   imgSource: "assets/images/restaurants/cafee.jpg", rating: 4.8},
  { id:3, name: "Five stars", description: "Expensive and beautiful",
   imgSource: "assets/images/restaurants/cool.jpg", rating: 4.7},
]

export const dishes : Dish[] = [
  { name: "Burger", price: 30, weight: 100, restaurant: restaurants[0],
     imgSource: "assets/images/dishes/burger.jpg", description: "tasty", rating:4.9 },
  { name: "Muffin", price: 15, weight: 50, restaurant: restaurants[1],
     imgSource: "assets/images/dishes/muffin.JPG", description: "tasty", rating:4.9 },
  { name: "Cool meat", price: 400, weight: 200, restaurant: restaurants[2],
     imgSource: "assets/images/dishes/meat.jpg", description: "tasty",  rating:4.8 },
     { name: "Cool meat", price: 400, weight: 200, restaurant: restaurants[2],
     imgSource: "assets/images/dishes/meat.jpg", description: "tasty",  rating:4.8 },
     { name: "Burger", price: 30, weight: 100, restaurant: restaurants[0],
     imgSource: "assets/images/dishes/burger.jpg", description: "tasty", rating:4.9 },
  { name: "Muffin", price: 15, weight: 50, restaurant: restaurants[1],
     imgSource: "assets/images/dishes/muffin.JPG", description: "tasty", rating:4.9 },
     
]

export const sortTypes = ["price", "name", "rating"];
/*//////////////*/

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
    NoServerConnectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbCollapseModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule
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
