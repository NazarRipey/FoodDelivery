import { restaurantSortType } from '../../../models/enums/sorts/restaurantSortType';
import { restaurantFilterParams } from './../../../models/filters/restaurantFilterParams';
import { restaurantListResponse } from './../../../models/restaurant/restaurantListResponse';
import { RestaurantService } from './../../../services/restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { paginationConfig } from '../../../models/paginationConfig';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  config: paginationConfig = new paginationConfig();
  restaurantResponse :restaurantListResponse = new restaurantListResponse();
  restaurantFilterParams : restaurantFilterParams = new restaurantFilterParams();

  restaurantTypeNames: string[];

  restaurantSortTypes = restaurantSortType;
  selectedsortType: string;
    
  toggleFilter = false;
  
  constructor(private cartService:CartService, 
    private route: ActivatedRoute,
    private router:Router,
    private restaurantService:RestaurantService) 
    { }

  ngOnInit(): void {
    this.restaurantService.getTypes().subscribe(t => this.restaurantTypeNames = t.map(t => t.name));

    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params.page ? +params.page : 1;
      this.config.itemsPerPage = 18;

      this.restaurantFilterParams.search = params.search ? params.search : null;
      this.restaurantFilterParams.types = params.Type ? params.Type.split(',') : [];

      this.selectedsortType = params.sortType? params.sortType: "Rating";
    });    

    this.restaurantFilterParams.itemsPerPage = this.config.itemsPerPage;
    this.restaurantFilterParams.currentPage = this.config.currentPage;
    this.restaurantFilterParams.restaurantSortType = this.restaurantSortTypes[`${this.selectedsortType}`];

    this.restaurantService.retrieve(this.restaurantFilterParams).subscribe(r => {
      this.restaurantResponse = r;
      this.config.totalItems = r.totalRestaurantsCount;
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
}
