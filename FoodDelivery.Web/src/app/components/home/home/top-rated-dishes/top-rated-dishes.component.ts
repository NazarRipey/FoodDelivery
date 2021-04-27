import { NgxSpinnerService } from 'ngx-spinner';
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
    private dishService:DishService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.dishService.getTop().subscribe(d => {
      this.dishes = d
      this.spinner.hide();
    });
  }

  openAddToCart(dishId: Guid){
    this.modalHelper.openAddToCart(dishId, true);
  }
}
