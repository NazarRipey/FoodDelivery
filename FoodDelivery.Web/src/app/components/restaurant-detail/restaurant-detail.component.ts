import { imgSrc } from './../../globals'
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from './../../services/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { RestaurantDetail } from 'src/app/models/restaurant/RestaurantDetail';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  imgSrc = imgSrc;
  restaurant: RestaurantDetail;
  sortType: string;
  searchParam: string;

  constructor(private restaurantService:RestaurantService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.restaurantService.getByName(name).subscribe(r => this.restaurant = r);
  }
}
