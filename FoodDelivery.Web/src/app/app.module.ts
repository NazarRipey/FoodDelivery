import { DishListComponent } from './list/dish-list/dish-list.component';
import { Restaurant } from './models/restaurant';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

import { NgbActiveModal, NgbCollapseModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home/home.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopRatedDishesComponent } from './home/home/top-rated-dishes/top-rated-dishes.component';
import { TopRatedRestaurantsComponent } from './home/home/top-rated-restaurants/top-rated-restaurants.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './filter/filter.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { ConfirmEmailComponent } from './auth/sign-up/confirm-email/confirm-email.component';
import { RestaurantListComponent } from './list/restaurant-list/restaurant-list.component';
import { Dish } from './models/dish';
import { NgxPaginationModule } from 'ngx-pagination';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { PickRoleComponent } from './auth/sign-up/pick-role/pick-role.component';
import { MessageComponent } from './auth/sign-up/message/message.component';

/*hardcoded data*/
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
    PickRoleComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbCollapseModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})

export class AppModule { }
