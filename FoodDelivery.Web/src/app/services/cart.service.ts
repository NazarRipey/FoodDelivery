import { Dish } from './../models/dish';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private modalSevice: NgbModal) { }

  public openAddToCart(dish: Dish){
    const modal = this.modalSevice.open(AddToCartComponent);
    modal.componentInstance.dish = dish;
  }
}
