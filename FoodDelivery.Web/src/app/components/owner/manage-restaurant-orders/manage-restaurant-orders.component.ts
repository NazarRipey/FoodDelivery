import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from './../../../services/restaurant.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-restaurant-orders',
  templateUrl: './manage-restaurant-orders.component.html',
  styleUrls: ['./manage-restaurant-orders.component.css']
})
export class ManageRestaurantOrdersComponent implements OnInit {

  restaurantNames: string[] = [];

  constructor(private restaurantService:RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.getNamesByOwner().subscribe(n => {
      this.restaurantNames = n;
    });
  }
}
