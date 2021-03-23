import { dish } from '../models/dish/dish';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { AddToCartComponent } from '../components/add-to-cart/add-to-cart.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private modalSevice: NgbModal) { }

  public openAddToCart(dish: dish){
    const modal = this.modalSevice.open(AddToCartComponent);
    modal.componentInstance.dish = dish;
  }
}
