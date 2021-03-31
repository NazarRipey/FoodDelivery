import { dishStatus } from './../../../models/enums/statuses/dishStatus';
import { restaurantStatus } from './../../../models/enums/statuses/restaurantStatus';
import { myRestaurantFilterParams } from './../../../models/filters/myRestaurantFilterParams';
import { restaurantDetailResponse } from './../../../models/restaurant/restaurantDetailResponse';
import { ownerRequestStatus } from './../../../models/enums/statuses/ownerRequestStatus';
import { dishObject } from '../../../models/dish/dishObject';
import { DishService } from './../../../services/dish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { paginationConfig } from './../../../models/paginationConfig';
import { dishListObject } from 'src/app/models/dish/dishListObject';
import { UpdateDishComponent } from './../update-dish/update-dish.component';
import { AddDishComponent } from './../add-dish/add-dish.component';
import { Guid } from 'guid-typescript';
import { AddAddressComponent } from './../add-address/add-address.component';
import { restaurantAddress } from './../../../models/restaurant/restaurantAddress';
import { restaurantDetailObject } from 'src/app/models/restaurant/restaurantDetailObject';
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

  config: paginationConfig = new paginationConfig();
  restaurantResponse: restaurantDetailResponse = new restaurantDetailResponse();
  myRestaurantFilterParams : myRestaurantFilterParams = new myRestaurantFilterParams();

  ownerRequestStatus = ownerRequestStatus;
  restaurantStatus = restaurantStatus;
  dishStatus = dishStatus;

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

    this.myRestaurantFilterParams.currentPage = this.config.currentPage;
    this.myRestaurantFilterParams.itemsPerPage = this.config.itemsPerPage;

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    this.restaurantService.retrieveMyRestaurants(this.myRestaurantFilterParams).subscribe(r => {
      this.restaurantResponse = r;
      this.config.totalItems = r.totalRestaurantsCount;
    });
  }

  addRestaurant(){
    this.modalService.open(AddRestaurantComponent);
  }

  addAddress(restaurantId: Guid){
    const modal = this.modalService.open(AddAddressComponent);
    modal.componentInstance.restaurantId = restaurantId; 
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

  updateRestaurant(restaurant: restaurantDetailObject){
    const modal = this.modalService.open(UpdateRestaurantComponent);
    modal.componentInstance.restaurant = restaurant;  
  }

  updateDish(dish: dishObject){
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

  Activate(id: Guid){
    this.restaurantService.activate(id).subscribe( _ => {
      location.reload();
    });
  }

  Stop(id: Guid){
    this.restaurantService.stop(id).subscribe( _ => {
      location.reload();
    });    
  }

  ActivateDish(id: Guid){
    this.dishSerivce.activate(id).subscribe( _ => {
      location.reload();
    });
  }

  StopDish(id: Guid){
    this.dishSerivce.stop(id).subscribe( _ => {
      location.reload();
    });    
  }
}
