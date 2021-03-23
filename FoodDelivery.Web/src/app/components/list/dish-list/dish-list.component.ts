import { dishParams } from './../../../models/dish/dishFilter';
import { RestaurantService } from './../../../services/restaurant.service';
import { DishService } from './../../../services/dish.service';
import { imgSrc } from './../../../app.module';
import { CartService } from '../../../services/cart.service';
import { sortTypes } from '../../../app.module';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { dish } from 'src/app/models/dish/dish';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { paginationConfig } from 'src/app/models/paginationConfig';
import { NouisliderModule } from 'ng2-nouislider';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  toggleNavbar = false;

  filterName = "type";
  imgSrc = imgSrc;
  dishes: dish[];

  dishParams: dishParams = new dishParams();

  restaurantNames: string[];
  dishCategories: string[];

  sortTypes = sortTypes;

  config: paginationConfig = new paginationConfig();

  constructor(private cartService:CartService,
    private route: ActivatedRoute,
    private router:Router,
    private dishService: DishService,
    private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.dishService.getCategories().subscribe(c => this.dishCategories = c.map(c => c.name));
    this.restaurantService.getAllNames().subscribe(r => this.restaurantNames = r);

    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params.page ? +params.page : 1;
      this.config.itemsPerPage = 18;
      this.config.sortType = params.sortType ? params.sortType : "popular";
      this.config.search = params.search ? params.search : null;

      this.dishParams.categories = params.Category ? params.Category.split(',') : [];
      this.dishParams.restaurants = params.Restaurant ? params.Restaurant.split(',') : [];
      this.dishParams.search = params.search ? params.search : null;
    });    

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    this.dishService.get(this.dishParams).subscribe(d => this.dishes = d);
  }

  pageChanged(event){
    this.router.navigate([], {queryParams: {page: event}, queryParamsHandling: 'merge'});
  }

  onSearch(searchPhrase){
    this.router.navigate([], {queryParams: {search: searchPhrase}, queryParamsHandling: 'merge'});
  }

  openAddToCart(item: dish){
    this.cartService.openAddToCart(item);
  }
}
