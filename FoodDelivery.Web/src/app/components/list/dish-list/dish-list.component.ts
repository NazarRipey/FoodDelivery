import { CartService } from '../../../services/cart.service';
import { dishes, sortTypes } from '../../../app.module';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dish } from 'src/app/models/dish';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { paginationConfig } from 'src/app/models/paginationConfig';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  toggleNavbar = false;

  filterName = "type";

  dishes: Dish[] = dishes;

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

  openAddToCart(item){
    this.cartService.openAddToCart(item);
  }
}
