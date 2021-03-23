import { imgSrc } from './../../app.module';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from './../../services/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { restaurant } from 'src/app/models/restaurant/restaurant';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  imgSrc = imgSrc;
  restaurant: restaurant;
  sortType: string;
  searchParam: string;

  constructor(private restaurantService:RestaurantService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.restaurantService.getByName(name).subscribe(r => this.restaurant = r);
  }

  onSearch(param: string){

  }
}
