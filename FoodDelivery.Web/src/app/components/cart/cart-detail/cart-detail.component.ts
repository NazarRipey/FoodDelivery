import { cartItem } from './../../../models/cart/cartItem';
import { imgSrc } from './../../../app.module';
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

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.get().subscribe(c => this.cartResponse = c);
  }

  Increment(item: cartItem){
    item.quantity++;
  }

  Decrement(item: cartItem){
    item.quantity--;
  }

  UpdateQuantity(item: cartItem){
    console.log(item);
  }
}
