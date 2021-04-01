import { modalHelper } from './../../../helpers/modalHelper';
import { cartHelper } from '../../../helpers/cartHelper';
import { AddToCartComponent } from '../../cart/add-to-cart/add-to-cart.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { dishObject } from '../../../models/dish/dishObject';
import { imgSrc } from './../../../globals'
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dish-list-item',
  templateUrl: './dish-list-item.component.html',
  styleUrls: ['./dish-list-item.component.css']
})
export class DishListItemComponent implements OnInit {

  imgSrc = imgSrc;

  @Input()
  dish: dishObject;

  constructor(private modalHelper: modalHelper) { }

  ngOnInit(): void {
  }

  openAddToCart(){
    this.modalHelper.openAddToCart(this.dish.id);
  }
}
