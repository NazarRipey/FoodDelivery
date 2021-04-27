import { NgxSpinnerService } from 'ngx-spinner';
import { CartHelper } from './../../../helpers/CartHelper';
import { ConfirmDialogComponent } from './../../confirm-dialog/confirm-dialog.component';
import { ConfirmOrderComponent } from './../../order/confirm-order/confirm-order.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { CartItem } from '../../../models/cart/CartItem';
import { imgSrc } from './../../../globals'
import { CartResponse } from '../../../models/cart/CartResponse';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {
  cartResponse: CartResponse = new CartResponse();
  imgSrc = imgSrc;
  total: number;

  constructor(private cartService: CartService, 
    private modalService: NgbModal,
    private router: Router,
    private cartHelper:CartHelper) { }

  ngOnInit(): void {
    this.cartService.get().subscribe(c => {
      this.cartResponse = c;
      if(c){
        this.calculateSum();
      }
    });

  }

  OpenConfirmOrder(){
    const modal = this.modalService.open(ConfirmOrderComponent);
    modal.componentInstance.cartId = this.cartResponse.id;
  }

  UpdateQuantity(i: number, quantity: number){
    if(quantity <= 0){
      alert("Quantity cannot be less than 1!")
    }
    else{
      this.cartService.updateItem(this.cartResponse.cartItems[i].id, quantity).subscribe(_ =>
        {
          this.cartService.getItem(this.cartResponse.cartItems[i].id.toString()).subscribe(ci => {
            this.cartResponse.cartItems[i] = ci;  
            this.calculateSum();
          })
        }
      );
    }
  }

  private calculateSum(){
    this.total = this.cartResponse.cartItems.reduce((a, b) => a + (b.dish.price * b.quantity || 0), 0);
  }

  RemoveItem(i: number){
    this.cartService.deleteItem(this.cartResponse.cartItems[i].id).subscribe(_ => {
      this.cartResponse.cartItems.splice(i, 1);
      if(this.cartResponse.cartItems.length == 0){
        location.reload();      
      }
      else{
        this.cartHelper.getInfo().subscribe();
        this.calculateSum();
      }
    }); 
  }

  RemoveCart(){
    const modal = this.modalService.open(ConfirmDialogComponent);
    modal.componentInstance.confirmHeader = "Clear cart";
    modal.componentInstance.confirmMessage = `Are you sure you want to clear cart?`;

    modal.result.then((result) => {
      if(result == true){
        this.cartService.deleteCart().subscribe(_ => {      
          this.router.navigateByUrl("dishes").then(_ => location.reload());
        })
      }
    });
  }
}
