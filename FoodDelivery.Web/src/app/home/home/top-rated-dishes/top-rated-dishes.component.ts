import { Restaurant } from './../../../models/restaurant';
import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/dish';

@Component({
  selector: 'app-top-rated-dishes',
  templateUrl: './top-rated-dishes.component.html',
  styleUrls: ['./top-rated-dishes.component.css']
})
export class TopRatedDishesComponent implements OnInit {
  /*hardcoded data*/
  restaurants : Restaurant[] = [
    { name: "McDonald's", description: "Cheap and fast",
     imgSource: "assets/images/restaurants/mcdonalds.jpg", rating: 5},
    { name: "Cozy", description: "Cozy and moderate",
     imgSource: "assets/images/restaurants/cafee.jpg", rating: 4.8},
    { name: "Five stars", description: "Expensive and beautiful",
     imgSource: "assets/images/restaurants/cool.jpg", rating: 4.7},
  ]

  dishes : Dish[] = [
    { name: "Burger", price: 30, weight: 100, restaurant: this.restaurants[0],
       imgSource: "assets/images/dishes/burger.jpg", description: "tasty", rating:4.9 },
    { name: "Muffin", price: 15, weight: 50, restaurant: this.restaurants[1],
       imgSource: "assets/images/dishes/muffin.JPG", description: "tasty", rating:4.9 },
    { name: "Cool meat", price: 400, weight: 200, restaurant: this.restaurants[2],
       imgSource: "assets/images/dishes/meat.jpg", description: "tasty",  rating:4.8 }
  ]
  /*//////////////*/
  constructor() { }

  ngOnInit(): void {
  }

}
