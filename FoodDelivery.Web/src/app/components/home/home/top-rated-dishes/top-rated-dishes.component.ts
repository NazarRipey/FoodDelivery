import { ModalHelper } from '../../../../helpers/ModalHelper';
import { Guid } from 'guid-typescript';
import { imgSrc } from './../../../../globals'
import { DishService } from './../../../../services/dish.service';
import { Component, OnInit } from '@angular/core';
import { DishList } from 'src/app/models/dish/DishList';

@Component({
  selector: 'app-top-rated-dishes',
  templateUrl: './top-rated-dishes.component.html',
  styleUrls: ['./top-rated-dishes.component.css']
})
export class TopRatedDishesComponent implements OnInit {

  dishes: DishList[];
  imgSrc = imgSrc;

  constructor(private modalHelper: ModalHelper,
    private dishService:DishService,) { }

  ngOnInit(): void {
    this.dishService.getTop().subscribe(d => this.dishes = d);
  }

  openAddToCart(dishId: Guid){
    this.modalHelper.openAddToCart(dishId, true);
  }
}
