import { Restaurant } from '../../../../models/restaurant/restaurant';
import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/dish';

@Component({
  selector: 'app-top-rated-restaurants',
  templateUrl: './top-rated-restaurants.component.html',
  styleUrls: ['./top-rated-restaurants.component.css']
})
export class TopRatedRestaurantsComponent implements OnInit {
  constructor() { }

  restaurants: Restaurant[];

  ngOnInit(): void {
  }

}
