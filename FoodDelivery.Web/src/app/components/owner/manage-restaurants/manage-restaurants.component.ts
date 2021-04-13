import { ConfirmDialogComponent } from './../../confirm-dialog/confirm-dialog.component';
import { DishStatus } from '../../../models/enums/statuses/DishStatus';
import { RestaurantStatus } from '../../../models/enums/statuses/RestaurantStatus';
import { MyRestaurantFilterParams } from '../../../models/filters/MyRestaurantFilterParams';
import { RestaurantOwnerDetailResponse } from '../../../models/restaurant/RestaurantOwnerDetailResponse';
import { OwnerRequestStatus } from '../../../models/enums/statuses/OwnerRequestStatus';
import { DishService } from './../../../services/dish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationConfig } from '../../../models/PaginationConfig';
import { UpdateDishComponent } from './../update-dish/update-dish.component';
import { AddDishComponent } from './../add-dish/add-dish.component';
import { Guid } from 'guid-typescript';
import { AddAddressComponent } from './../add-address/add-address.component';
import { RestaurantAddress } from '../../../models/restaurant/RestaurantAddress';
import { UpdateRestaurantComponent } from './../update-restaurant/update-restaurant.component';
import { RestaurantService } from './../../../services/restaurant.service';
import { imgSrc } from './../../../globals';
import { AddRestaurantComponent } from './../add-restaurant/add-restaurant.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserHelper } from '../../../helpers/UserHelper';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-restaurants',
  templateUrl: './manage-restaurants.component.html',
  styleUrls: ['./manage-restaurants.component.css']
})
export class ManageRestaurantsComponent implements OnInit {
  imgSrc = imgSrc;

  config: PaginationConfig = new PaginationConfig();
  restaurantResponse: RestaurantOwnerDetailResponse = new RestaurantOwnerDetailResponse();
  myRestaurantFilterParams : MyRestaurantFilterParams = new MyRestaurantFilterParams();

  ownerRequestStatus = OwnerRequestStatus;
  restaurantStatus = 
  RestaurantStatus;
  dishStatus = DishStatus;

  constructor(public userHelper:UserHelper, 
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

  removeAddress(address: RestaurantAddress){
    this.restaurantService.removeAddress(address.id).subscribe(_ => {
      location.reload();
    }, error => {
      console.log(error);
    });
  }

  removeRestaurant(restaurantId: Guid, restaurantName:string){
    const modal = this.modalService.open(ConfirmDialogComponent);
    modal.componentInstance.confirmHeader = "Restaurant deleting";
    modal.componentInstance.confirmMessage = `Are you sure you want to delete ${restaurantName}?\r\n` +
     "You won't be able to restore it.";

    modal.result.then((result) => {
      if(result == true){
        this.restaurantService.removeRestaurant(restaurantId).subscribe(_ => {
          this.router.navigate(['/manage'], { queryParams: { page: '1' } });
        }, error => {
          console.log(error);
        });
      }
    });
  }

  updateRestaurant(id: Guid, name: string){
    const modal = this.modalService.open(UpdateRestaurantComponent);
    modal.componentInstance.restaurantId = id;  
    modal.componentInstance.restaurantName = name;  
  }

  updateDish(id: Guid)
  {
    console.log(this.restaurantResponse.restaurants[0].dishes[0]);
    const modal = this.modalService.open(UpdateDishComponent);
    console.log(id);
    modal.componentInstance.dishId = id;  
  }

  removeDish(dishId: Guid, dishName: string){
    const modal = this.modalService.open(ConfirmDialogComponent);
    modal.componentInstance.confirmHeader = "Restaurant deleting";
    modal.componentInstance.confirmMessage = `Are you sure you want to delete ${dishName}?`;

    modal.result.then((result) => {
      if(result == true){
        this.dishSerivce.removeDish(dishId).subscribe(_ => {
          location.reload();      
        }, error => {
          console.log(error);
        });
      }
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
