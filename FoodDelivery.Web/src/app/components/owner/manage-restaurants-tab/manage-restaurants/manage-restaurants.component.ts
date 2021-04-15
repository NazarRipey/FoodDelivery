import { DishDetail } from './../../../../models/dish/DishDetail';
import { RestaurantDetail } from 'src/app/models/restaurant/RestaurantDetail';
import { DishRestaurantFilterParams } from '../../../../models/filters/DishRestaurantFilterParams';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import { DishStatus } from '../../../../models/enums/statuses/DishStatus';
import { RestaurantStatus } from '../../../../models/enums/statuses/RestaurantStatus';
import { DishService } from '../../../../services/dish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationConfig } from '../../../../models/PaginationConfig';
import { UpdateDishComponent } from '../update-dish/update-dish.component';
import { AddDishComponent } from '../add-dish/add-dish.component';
import { AddAddressComponent } from '../add-address/add-address.component';
import { UpdateRestaurantComponent } from '../update-restaurant/update-restaurant.component';
import { RestaurantService } from '../../../../services/restaurant.service';
import { imgSrc } from '../../../../globals';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserHelper } from '../../../../helpers/UserHelper';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-restaurants',
  templateUrl: './manage-restaurants.component.html',
  styleUrls: ['./manage-restaurants.component.css']
})
export class ManageRestaurantsComponent implements OnInit {
  imgSrc = imgSrc;

  restaurant: RestaurantDetail = new RestaurantDetail();
  dishes: DishDetail[] = [];
  config: PaginationConfig = new PaginationConfig();
  filterParams: DishRestaurantFilterParams = new DishRestaurantFilterParams();

  restaurantStatus = RestaurantStatus;
  dishStatus = DishStatus;

  constructor(public userHelper:UserHelper, 
    private modalService: NgbModal,
    private restaurantService:RestaurantService,
    private route: ActivatedRoute,
    private router:Router, 
    private dishSerivce: DishService) { }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');

    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params.page ? +params.page : 1;
      this.config.itemsPerPage = 18;

      this.filterParams.search = params.search ? params.search : null;
    });   

    this.filterParams.currentPage = this.config.currentPage;
    this.filterParams.itemsPerPage = this.config.itemsPerPage;

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    this.restaurantService.getByName(name).subscribe(r => {
      this.restaurant = r;
      if(r){
        this.filterParams.restaurantName = r.name;
        this.dishSerivce.retrieveDetailByRestaurant(this.filterParams).subscribe(d => {
          this.dishes = d.dishes
          this.config.totalItems = d.totalDishesCount;
        })
      }
    });
  }

  addAddress(){
    const modal = this.modalService.open(AddAddressComponent);
    modal.componentInstance.restaurantId = this.restaurant.id; 

    modal.result.then((result) => {
      this.getAddresses();
    });
  }

  addDish(){
    const modal = this.modalService.open(AddDishComponent);
    modal.componentInstance.restaurantId = this.restaurant.id; 

    modal.result.then((result) => {
      this.getDishes();
    });
  }

  removeAddress(i: number){
    this.restaurantService.removeAddress(this.restaurant.addresses[i].id)
    .subscribe(_ => {
      this.restaurant.addresses.splice(i, 1);
    });
  }

  removeRestaurant(){
    const modal = this.modalService.open(ConfirmDialogComponent);
    modal.componentInstance.confirmHeader = "Restaurant deleting";
    modal.componentInstance.confirmMessage = `Are you sure you want to delete ${this.restaurant.name}?\r\n` +
     "You won't be able to restore it.";

    modal.result.then((result) => {
      if(result == true){
        this.restaurantService.removeRestaurant(this.restaurant.id).subscribe(_ => {
          this.router.navigate(['/manage']);
        }, error => {
          console.log(error);
        });
      }
    });
  }

  updateRestaurant(){
    const modal = this.modalService.open(UpdateRestaurantComponent);

    modal.componentInstance.restaurantId = this.restaurant.id;  
    modal.componentInstance.restaurantName = this.restaurant.name;  

    modal.result.then((result) => {
      this.getRestaurant();
    });
  }

  updateDish(i: number)
  {
    const modal = this.modalService.open(UpdateDishComponent);
    modal.componentInstance.dishId = this.dishes[i].id;  
    
    modal.result.then((result) => {
      this.getDish(i);
    });
  }

  removeDish(i: number){
    const modal = this.modalService.open(ConfirmDialogComponent);
    modal.componentInstance.confirmHeader = "Restaurant deleting";
    modal.componentInstance.confirmMessage = `Are you sure you want to delete ${this.dishes[i].name}?`;

    modal.result.then((result) => {
      if(result == true){
        this.dishSerivce.removeDish(this.dishes[i].id).subscribe(_ => {
          this.dishes.splice(i, 1);
        }, error => {
          console.log(error);
        });
      }
    });
  }

  pageChanged(event){
    this.router.navigate([], {queryParams: { page: event }, queryParamsHandling: 'merge'});

    setTimeout(() => {
      document.getElementById('menu').scrollIntoView();
    }, 150)
  }

  Activate(){
    this.restaurantService.activate(this.restaurant.id).subscribe( _ => {
      this.getRestaurant();
    });
  }

  Stop(){
    this.restaurantService.stop(this.restaurant.id).subscribe( _ => {
      this.getRestaurant();
    });    
  }

  ActivateDish(i: number){
    this.dishSerivce.activate(this.dishes[i].id).subscribe( _ => {
      this.getDish(i);
    });
  }

  StopDish(i: number){
    this.dishSerivce.stop(this.dishes[i].id).subscribe( _ => {
      this.getDish(i);
    });    
  }

  private getAddresses(){
    this.restaurantService.getAddresses(this.restaurant.id).subscribe(a => {
      this.restaurant.addresses = a;
    })
  }

  private getDishes(){
    this.dishSerivce.retrieveDetailByRestaurant(this.filterParams).subscribe(d => {
      this.dishes = d.dishes
      this.config.totalItems = d.totalDishesCount;
    })
  }

  public getDish(i: number){
    this.dishSerivce.getDetailDishById(this.dishes[i].id.toString()).subscribe(d => {
      this.dishes[i] = d;
    })
  }

  private getRestaurant(){
    this.restaurantService.getByName(this.restaurant.name).subscribe(r => {
      this.restaurant = r;
    })
  }
}
