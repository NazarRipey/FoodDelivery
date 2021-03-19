import { imgSrc } from './../../../../app.module';
import { RestaurantService } from './../../../../services/restaurant.service';
import { Restaurant } from '../../../../models/restaurant/restaurant';
import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/dish';

@Component({
  selector: 'app-top-rated-restaurants',
  templateUrl: './top-rated-restaurants.component.html',
  styleUrls: ['./top-rated-restaurants.component.css']
})
export class TopRatedRestaurantsComponent implements OnInit {
  constructor(private restaurantService:RestaurantService) { }

  restaurants: Restaurant[];
  imgSrc = imgSrc;

  ngOnInit(): void {
    this.restaurantService.getTop().subscribe(r => this.restaurants = r);
  }
}
