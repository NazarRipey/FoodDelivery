import { modalHelper } from './../../../../helpers/modalHelper';
import { cartHelper } from './../../../../helpers/cartHelper';
import { Guid } from 'guid-typescript';
import { imgSrc } from './../../../../globals'
import { DishService } from './../../../../services/dish.service';
import { restaurantDetailObject } from '../../../../models/restaurant/restaurantDetailObject';
import { Component, OnInit } from '@angular/core';
import { dishListObject } from 'src/app/models/dish/dishListObject';

@Component({
  selector: 'app-top-rated-dishes',
  templateUrl: './top-rated-dishes.component.html',
  styleUrls: ['./top-rated-dishes.component.css']
})
export class TopRatedDishesComponent implements OnInit {

  dishes: dishListObject[];
  restaurants: restaurantDetailObject[];
  imgSrc = imgSrc;

  constructor(private modalHelper: modalHelper,
    private dishService:DishService,) { }

  ngOnInit(): void {
    this.dishService.getTop().subscribe(d => this.dishes = d);
  }

  openAddToCart(dishId: Guid){
    this.modalHelper.openAddToCart(dishId);
  }
}
