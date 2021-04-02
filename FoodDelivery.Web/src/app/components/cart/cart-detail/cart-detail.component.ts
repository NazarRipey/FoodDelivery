import { ConfirmOrderComponent } from './../../order/confirm-order/confirm-order.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { cartItem } from './../../../models/cart/cartItem';
import { imgSrc } from './../../../globals'
import { cartResponse } from './../../../models/cart/cartResponse';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  cartResponse: cartResponse = new cartResponse();
  imgSrc = imgSrc;

  constructor(private cartService: CartService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cartService.get().subscribe(c => this.cartResponse = c);
  }

  Increment(item: cartItem){
    item.quantity++;
  }

  Decrement(item: cartItem){
    item.quantity--;
  }

  OpenConfirmOrder(){
    const modal = this.modalService.open(ConfirmOrderComponent);
    modal.componentInstance.cartId = this.cartResponse.id;
  }

  UpdateQuantity(item: cartItem){
    this.cartService.updateItem(item.id, item.quantity).subscribe(_ => {
      location.reload();
    })
  }

  RemoveItem(id: Guid){
    this.cartService.deleteItem(id).subscribe(_ => {
      location.reload();
    });    
  }

  RemoveCart(){
    this.cartService.deleteCart(this.cartResponse.id).subscribe(_ => {
      location.reload();
    })
  }
}
