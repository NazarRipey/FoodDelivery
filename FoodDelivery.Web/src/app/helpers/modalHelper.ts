import { OrderItemsComponent } from './../components/order-manager/manage-orders-list/order-items/order-items.component';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddToCartComponent } from '../components/cart/add-to-cart/add-to-cart.component';
import { Guid } from 'guid-typescript';

@Injectable({
    providedIn: 'root'
})
export class ModalHelper{
    constructor(private modalSevice:NgbModal){
    }
    
    openAddToCart(dishId: Guid, showDetail?: boolean){
        const modal = this.modalSevice.open(AddToCartComponent);
        modal.componentInstance.dishId = dishId;
        if(showDetail){
            modal.componentInstance.showDetail = showDetail;
        }
    }

    openOrderItems(orderId: Guid){
        const modal = this.modalSevice.open(OrderItemsComponent);
        modal.componentInstance.orderId = orderId;
    }

    openOrderItemsEdit(orderId: Guid){
        const modal = this.modalSevice.open(OrderItemsComponent);
        modal.componentInstance.orderId = orderId;
        modal.componentInstance.enableEditing = true;

        modal.result.then((result) => {
            location.reload();
          }, (reason) => {
            location.reload();
          });
    }
}