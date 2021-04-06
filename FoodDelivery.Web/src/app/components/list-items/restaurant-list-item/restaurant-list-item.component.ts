import { imgSrc } from './../../../globals'
import { RestaurantList } from '../../../models/restaurant/RestaurantList';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-list-item',
  templateUrl: './restaurant-list-item.component.html',
  styleUrls: ['./restaurant-list-item.component.css']
})
export class RestaurantListItemComponent implements OnInit {

  @Input()
  restaurant: RestaurantList;

  imgSrc = imgSrc;

  constructor() { }

  ngOnInit(): void {
  }

}
