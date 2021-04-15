import { DishList } from 'src/app/models/dish/DishList';
import { RestaurantStatus } from './../../models/enums/statuses/RestaurantStatus';
import { DishService } from './../../services/dish.service';
import { DishRestaurantFilterParams } from './../../models/filters/DishRestaurantFilterParams';
import { PaginationConfig } from './../../models/PaginationConfig';
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
  filterParams: DishRestaurantFilterParams = new DishRestaurantFilterParams(); 
  config: PaginationConfig = new PaginationConfig();
  restaurant: RestaurantDetail = new RestaurantDetail();
  dishes: DishList[] = [];

  imgSrc = imgSrc;
  statuses = RestaurantStatus;

  currentRating = 3;
  readOnly = false;

  constructor(private restaurantService:RestaurantService,
    private dishService: DishService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {   
    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params.page ? +params.page : 1;
      this.config.itemsPerPage = 18;
      this.filterParams.search = params.search ? params.search : null;
    });

    const name = this.route.snapshot.paramMap.get('name');

    this.filterParams.restaurantName = name;
    this.filterParams.currentPage = this.config.currentPage;
    this.filterParams.itemsPerPage = this.config.itemsPerPage;

    this.restaurantService.getByName(this.filterParams.restaurantName).subscribe(r => {
      if(r){
        this.restaurant = r;
        if(r.rating){
          this.currentRating = r.rating;
        }else{
          this.currentRating = 0;
        }
        this.dishService.retrieveByRestaurant(this.filterParams).subscribe(d => {
          this.dishes = d.dishes;
          this.config.totalItems = d.totalDishesCount;
        });
      }
      else{
        this.router.navigateByUrl('/notfound');
      }
    });

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  pageChanged(event){
    this.router.navigate([], {queryParams: {page: event}, queryParamsHandling: 'merge'});

    setTimeout(() => {
      document.getElementById('menu').scrollIntoView();
    }, 150)
  }

  rated(){
    alert(this.currentRating);
    this.readOnly = true;
  }
}
