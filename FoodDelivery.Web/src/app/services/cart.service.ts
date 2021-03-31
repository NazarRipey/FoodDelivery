import { Guid } from 'guid-typescript';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { AddToCartComponent } from '../components/add-to-cart/add-to-cart.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private modalSevice: NgbModal) { }

  public openAddToCart(dishId: Guid){
    const modal = this.modalSevice.open(AddToCartComponent);
    modal.componentInstance.dishId = dishId;
  }
}
