import { OrderItemsComponent } from './../components/order-manager/manage-orders-list/order-items/order-items.component';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddToCartComponent } from '../components/cart/add-to-cart/add-to-cart.component';
import { Guid } from 'guid-typescript';

@Injectable({
    providedIn: 'root'
})
export class ModalHelper{
    constructor(private modalService:NgbModal){
    }
    
    openAddToCart(dishId: Guid, showDetail?: boolean){
        const modal = this.modalService.open(AddToCartComponent);
        modal.componentInstance.dishId = dishId;
        if(showDetail){
            modal.componentInstance.showDetail = showDetail;
        }
    }

    openOrderItems(orderId: Guid){
        const modal = this.modalService.open(OrderItemsComponent);
        modal.componentInstance.orderId = orderId;
        modal.componentInstance.header = "Order items";
    }
}