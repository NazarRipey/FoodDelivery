import { DishList } from './../../../models/dish/DishList';
import { ModalHelper } from '../../../helpers/ModalHelper';
import { CartHelper } from '../../../helpers/CartHelper';
import { AddToCartComponent } from '../../cart/add-to-cart/add-to-cart.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DishAddModel } from '../../../models/dish/DishAddModel';
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
  dish: DishList;

  constructor(private modalHelper: ModalHelper) { }

  ngOnInit(): void {
  }

  openAddToCart(){
    this.modalHelper.openAddToCart(this.dish.id);
  }
}
