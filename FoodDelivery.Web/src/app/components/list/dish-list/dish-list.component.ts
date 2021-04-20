import { listItemsPerPage } from './../../../globals';
import { DishSortType } from '../../../models/enums/sorts/DishSortType';
import { SliderOptions } from '../../../models/SliderOptions';
import { DishListResponse } from '../../../models/dish/DishListResponse';
import { DishFilterParams } from '../../../models/filters/DishFilterParams';
import { RestaurantService } from './../../../services/restaurant.service';
import { DishService } from './../../../services/dish.service';
import { CartService } from '../../../services/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationConfig } from 'src/app/models/PaginationConfig';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  sliderOptions: SliderOptions = new SliderOptions();
  dishResponse: DishListResponse = new DishListResponse();
  dishFilterParams: DishFilterParams = new DishFilterParams();
  config: PaginationConfig = new PaginationConfig();
  
  restaurantNames: string[];
  dishCategories: string[];

  dishSortTypes = DishSortType;
  selectedsortType: string;

  toggleFilters = false;

  constructor(private cartService:CartService,
    private route: ActivatedRoute,
    private router:Router,
    private dishService: DishService,
    private restaurantService: RestaurantService) {    
  }

  ngOnInit(): void {
    this.dishService.getCategories().subscribe(c => this.dishCategories = c.map(c => c.name));
    this.restaurantService.getAllNames().subscribe(r => this.restaurantNames = r);

    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params.page ? +params.page : 1;
      this.config.itemsPerPage = listItemsPerPage;

      this.dishFilterParams.categories = params.Category ? params.Category.split(',') : [];
      this.dishFilterParams.restaurants = params.Restaurant ? params.Restaurant.split(',') : [];
      this.dishFilterParams.search = params.search ? params.search : null;

      this.sliderOptions.currentMin = +params.minPrice ? +params.minPrice : null;
      this.sliderOptions.currentMax = +params.maxPrice ? +params.maxPrice : null;
      
      this.selectedsortType = params.sortType? params.sortType: "Popularity";
    });    

    this.dishFilterParams.itemsPerPage = this.config.itemsPerPage;
    this.dishFilterParams.currentPage = this.config.currentPage;
    this.dishFilterParams.minPrice = this.sliderOptions.currentMin;
    this.dishFilterParams.maxPrice = this.sliderOptions.currentMax;
    this.dishFilterParams.dishSortType = this.dishSortTypes[`${this.selectedsortType}`];

    this.dishService.retrieve(this.dishFilterParams).subscribe(d => {
      this.dishResponse = d;
      this.config.totalItems = d.totalDishesCount;
      this.sliderOptions.options = {
        floor: d.minPrice | 0,
        ceil: d.maxPrice | 0
      };
      if(!this.sliderOptions.currentMax){
        this.sliderOptions.currentMax = d.maxPrice;
      }
      if(!this.sliderOptions.currentMin){
        this.sliderOptions.currentMin = d.minPrice;
      }
    });

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  pageChanged(event){
    this.router.navigate([], {queryParams: {page: event}, queryParamsHandling: 'merge'});
  }

  changePriceRange(){
    this.router.navigate([], {queryParams: {
        minPrice: this.sliderOptions.currentMin, 
        maxPrice: this.sliderOptions.currentMax
      }, 
      queryParamsHandling: 'merge'});
  }
}
