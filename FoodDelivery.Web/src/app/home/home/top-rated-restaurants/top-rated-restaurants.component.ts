import { Restaurant } from './../../../models/restaurant';
import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/dish';

@Component({
  selector: 'app-top-rated-restaurants',
  templateUrl: './top-rated-restaurants.component.html',
  styleUrls: ['./top-rated-restaurants.component.css']
})
export class TopRatedRestaurantsComponent implements OnInit {
  constructor() { }

  /*hardcoded data*/
  restaurants : Restaurant[] = [
    { name: "McDonald's", description: "Cheap and fast",
     imgSource: "assets/images/restaurants/mcdonalds.jpg", rating: 5},
    { name: "Cozy", description: "Cozy and moderate",
     imgSource: "assets/images/restaurants/cafee.jpg", rating: 4.8},
    { name: "Five stars", description: "Expensive and beautiful",
     imgSource: "assets/images/restaurants/cool.jpg", rating: 4.7},
  ]
  /*888*/

  ngOnInit(): void {
  }

}
