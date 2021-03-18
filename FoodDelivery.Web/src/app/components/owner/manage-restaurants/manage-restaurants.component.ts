import { RestaurantService } from './../../../services/restaurant.service';
import { imgSrc } from './../../../app.module';
import { AddRestaurantComponent } from './../add-restaurant/add-restaurant.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { userHelper } from './../../../helpers/userHelper';
import { Restaurant } from '../../../models/restaurant/restaurant';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-restaurants',
  templateUrl: './manage-restaurants.component.html',
  styleUrls: ['./manage-restaurants.component.css']
})
export class ManageRestaurantsComponent implements OnInit {

  imgSrc = imgSrc;
  restaurants: Restaurant[];

  constructor(public userHelper:userHelper, 
    private modalService: NgbModal,
    private restaurantService:RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.getMyRestaurants().subscribe(r => this.restaurants = r);
  }

  addRestaurant(){
    this.modalService.open(AddRestaurantComponent);
  }
}
