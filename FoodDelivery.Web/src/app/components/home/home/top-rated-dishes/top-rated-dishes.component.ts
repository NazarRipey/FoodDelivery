import { CartService } from './../../../../services/cart.service';
import { imgSrc } from './../../../../app.module';
import { DishService } from './../../../../services/dish.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { restaurant } from '../../../../models/restaurant/restaurant';
import { Component, OnInit } from '@angular/core';
import { dish } from 'src/app/models/dish/dish';

@Component({
  selector: 'app-top-rated-dishes',
  templateUrl: './top-rated-dishes.component.html',
  styleUrls: ['./top-rated-dishes.component.css']
})
export class TopRatedDishesComponent implements OnInit {

  dishes: dish[];
  restaurants: restaurant[];
  imgSrc = imgSrc;

  constructor(private cartService:CartService,
    private dishService:DishService,) { }

  ngOnInit(): void {
    this.dishService.getTop().subscribe(d => this.dishes = d);
  }

  openAddToCart(dish: dish){
    this.cartService.openAddToCart(dish);
  }
}
