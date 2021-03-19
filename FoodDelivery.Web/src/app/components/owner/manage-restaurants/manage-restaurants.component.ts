import { Guid } from 'guid-typescript';
import { AddAddressComponent } from './../add-address/add-address.component';
import { restaurantAddress } from './../../../models/restaurant/restaurantAddress';
import { Restaurant } from 'src/app/models/restaurant/restaurant';
import { UpdateRestaurantComponent } from './../update-restaurant/update-restaurant.component';
import { RestaurantService } from './../../../services/restaurant.service';
import { imgSrc } from './../../../app.module';
import { AddRestaurantComponent } from './../add-restaurant/add-restaurant.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { userHelper } from './../../../helpers/userHelper';
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

  addAddress(rs: Restaurant){
    const modal = this.modalService.open(AddAddressComponent);
    modal.componentInstance.restaurantId = rs.id; 
  }

  removeAddress(address: restaurantAddress){
    this.restaurantService.removeAddress(address.id).subscribe(_ => {
      location.reload();
    }, error => {
      console.log(error);
    });
  }

  removeRestaurant(restaurantId: Guid){
    this.restaurantService.removeRestaurant(restaurantId).subscribe(_ => {
      location.reload();
    }, error => {
      console.log(error);
    });
  }

  updateRestaurant(restaurant: Restaurant){
    const modal = this.modalService.open(UpdateRestaurantComponent);
    modal.componentInstance.restaurant = restaurant;  
  }
}
