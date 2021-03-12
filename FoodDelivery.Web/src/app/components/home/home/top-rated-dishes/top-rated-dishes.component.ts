import { CartService } from '../../../../services/cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { dishes, restaurants } from '../../../../app.module';
import { Restaurant } from '../../../../models/restaurant';
import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/dish';

@Component({
  selector: 'app-top-rated-dishes',
  templateUrl: './top-rated-dishes.component.html',
  styleUrls: ['./top-rated-dishes.component.css']
})
export class TopRatedDishesComponent implements OnInit {

  dishes: Dish[] = dishes;
  restaurants: Restaurant[] = restaurants;

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
  }

  openAddToCart(dish){
    this.cartService.openAddToCart(dish);
  }
}
