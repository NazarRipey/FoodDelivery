import { imgSrc } from './../../../app.module';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { paginationConfig } from '../../../models/paginationConfig';
import { Restaurant } from '../../../models/restaurant/restaurant';
import { sortTypes } from '../../../app.module';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  
  toggleNavbar = false;
  filterName = "type";
  imgSrc = imgSrc;

  restaurants: Restaurant[];
  sortTypes = sortTypes;

  config: paginationConfig = new paginationConfig();

  constructor(private cartService:CartService, private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params.page ? +params.page : 1;
      this.config.itemsPerPage = 18;
      this.config.sortType = params.sortType ? params.sortType : "popular";
      this.config.search = params.search ? params.search : "";
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
