import { ConfirmOrderComponent } from './../../order/confirm-order/confirm-order.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { CartItem } from '../../../models/cart/CartItem';
import { imgSrc } from './../../../globals'
import { CartResponse } from '../../../models/cart/CartResponse';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  cartResponse: CartResponse = new CartResponse();
  imgSrc = imgSrc;

  constructor(private cartService: CartService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cartService.get().subscribe(c => this.cartResponse = c);
  }

  Increment(item: CartItem){
    item.quantity++;
  }

  Decrement(item: CartItem){
    item.quantity--;
  }

  OpenConfirmOrder(){
    const modal = this.modalService.open(ConfirmOrderComponent);
    modal.componentInstance.cartId = this.cartResponse.id;
  }

  UpdateQuantity(item: CartItem){
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
    this.cartService.deleteCart().subscribe(_ => {
      location.reload();
    })
  }
}
