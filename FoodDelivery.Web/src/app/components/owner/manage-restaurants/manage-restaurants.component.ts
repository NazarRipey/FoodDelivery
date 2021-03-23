import { DishService } from './../../../services/dish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { paginationConfig } from './../../../models/paginationConfig';
import { dish } from 'src/app/models/dish/dish';
import { UpdateDishComponent } from './../update-dish/update-dish.component';
import { AddDishComponent } from './../add-dish/add-dish.component';
import { Guid } from 'guid-typescript';
import { AddAddressComponent } from './../add-address/add-address.component';
import { restaurantAddress } from './../../../models/restaurant/restaurantAddress';
import { restaurant } from 'src/app/models/restaurant/restaurant';
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
  restaurants: restaurant[];
  config: paginationConfig = new paginationConfig();

  constructor(public userHelper:userHelper, 
    private modalService: NgbModal,
    private restaurantService:RestaurantService,
    private route: ActivatedRoute,
    private router:Router, 
    private dishSerivce: DishService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params.page ? +params.page : 1;
      this.config.itemsPerPage = 1;
    });   

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
    this.restaurantService.getMyRestaurants().subscribe(r => this.restaurants = r);
  }

  addRestaurant(){
    console.log(this.restaurants[0].dishes[0]);
    this.modalService.open(AddRestaurantComponent);
  }

  addAddress(rs: restaurant){
    const modal = this.modalService.open(AddAddressComponent);
    modal.componentInstance.restaurantId = rs.id; 
  }

  addDish(restaurantId: Guid){
    const modal = this.modalService.open(AddDishComponent);
    modal.componentInstance.restaurantId = restaurantId; 
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
      this.router.navigate(['/manage'], { queryParams: { page: '1' } });
    }, error => {
      console.log(error);
    });
  }

  updateRestaurant(restaurant: restaurant){
    const modal = this.modalService.open(UpdateRestaurantComponent);
    modal.componentInstance.restaurant = restaurant;  
  }

  updateDish(dish: dish){
    const modal = this.modalService.open(UpdateDishComponent);
    modal.componentInstance.dish = dish;  
  }

  removeDish(dishId: Guid){
    this.dishSerivce.removeDish(dishId).subscribe(_ => {
      location.reload();      
    }, error => {
      console.log(error);
    });
  }

  pageChanged(event){
    this.router.navigate([], {queryParams: {page: event}, queryParamsHandling: 'merge'});
  }
}
