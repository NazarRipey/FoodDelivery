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

  constructor(private cartService: CartService, 
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {
    this.cartService.get().subscribe(c => this.cartResponse = c);
  }

  OpenConfirmOrder(){
    const modal = this.modalService.open(ConfirmOrderComponent);
    modal.componentInstance.cartId = this.cartResponse.id;
  }

  UpdateQuantity(item: CartItem, quantity: number){
    if(quantity <= 0){
      alert("Quantity cannot be less than 1!")
    }
    else{
      this.cartService.updateItem(item.id, quantity).subscribe(_ => {
        location.reload();
      })
    }
  }

  RemoveItem(id: Guid){
    this.cartService.deleteItem(id).subscribe(_ => {
      location.reload();
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
