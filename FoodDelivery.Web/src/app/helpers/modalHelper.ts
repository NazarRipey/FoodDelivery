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
}