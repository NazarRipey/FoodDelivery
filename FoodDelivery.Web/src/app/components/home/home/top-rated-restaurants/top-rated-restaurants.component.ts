import { restaurantDetailObject } from 'src/app/models/restaurant/restaurantDetailObject';
import { imgSrc } from './../../../../globals'
import { RestaurantService } from './../../../../services/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { dishListObject } from 'src/app/models/dish/dishListObject';

@Component({
  selector: 'app-top-rated-restaurants',
  templateUrl: './top-rated-restaurants.component.html',
  styleUrls: ['./top-rated-restaurants.component.css']
})
export class TopRatedRestaurantsComponent implements OnInit {
  constructor(private restaurantService:RestaurantService) { }

  restaurants: restaurantDetailObject[];
  imgSrc = imgSrc;

  ngOnInit(): void {
    this.restaurantService.getTop().subscribe(r => this.restaurants = r);
  }
}
