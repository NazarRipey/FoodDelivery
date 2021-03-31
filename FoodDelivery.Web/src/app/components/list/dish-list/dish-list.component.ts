import { Guid } from 'guid-typescript';
import { dishSortType } from '../../../models/enums/sorts/dishSortType';
import { sliderOptions } from './../../../models/sliderOptions';
import { dishListResponse } from './../../../models/dish/dishListResponse';
import { dishFilterParams } from '../../../models/filters/dishFilterParams';
import { NouisliderModule } from 'ng2-nouislider';
import { RestaurantService } from './../../../services/restaurant.service';
import { DishService } from './../../../services/dish.service';
import { imgSrc, sortTypes } from './../../../app.module';
import { CartService } from '../../../services/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { dishListObject } from 'src/app/models/dish/dishListObject';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { paginationConfig } from 'src/app/models/paginationConfig';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  sliderOptions: sliderOptions = new sliderOptions();
  dishResponse: dishListResponse = new dishListResponse();
  dishFilterParams: dishFilterParams = new dishFilterParams();
  config: paginationConfig = new paginationConfig();
  
  restaurantNames: string[];
  dishCategories: string[];

  dishSortTypes = dishSortType;
  sortTypes() : Array<string> {
    var keys: string[] = Object.keys(this.dishSortTypes);
    return keys.slice(keys.length / 2);
  }
  selectedsortType: string;

  toggleFilters = false;
  imgSrc = imgSrc;

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
      this.config.itemsPerPage = 18;

      this.dishFilterParams.categories = params.Category ? params.Category.split(',') : [];
      this.dishFilterParams.restaurants = params.Restaurant ? params.Restaurant.split(',') : [];
      this.dishFilterParams.search = params.search ? params.search : null;

      this.sliderOptions.currentMin = +params.minPrice ? +params.minPrice : null;
      this.sliderOptions.currentMax = +params.maxPrice ? +params.maxPrice : null;
      
      this.selectedsortType = params.sortType? params.sortType: "Rating";
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
        floor: d.minPrice,
        ceil: d.maxPrice
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

  onSearch(searchPhrase){
    this.router.navigate([], {queryParams: {search: searchPhrase}, queryParamsHandling: 'merge'});
  }

  openAddToCart(dishId: Guid){
    this.cartService.openAddToCart(dishId);
  }

  changePriceRange(){
    this.router.navigate([], {queryParams: {
        minPrice: this.sliderOptions.currentMin, 
        maxPrice: this.sliderOptions.currentMax
      }, 
      queryParamsHandling: 'merge'});
  }
}
