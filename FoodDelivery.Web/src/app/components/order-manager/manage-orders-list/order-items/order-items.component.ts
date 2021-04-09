import { OrderService } from './../../../../services/order.service';
import { Guid } from 'guid-typescript';
import { OrderItem } from './../../../../models/order/OrderItem';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  items: OrderItem[] = [];

  orderId: Guid;
  enableEditing: boolean = false;

  constructor(public modalRef: NgbActiveModal,
    private orderService:OrderService) {
    }

  ngOnInit(): void {
    this.orderService.getOrderItems(this.orderId.toString()).subscribe(i => this.items = i);
  }

  updateQuantity(id: Guid, quantity: number){
    if(quantity <= 0){
      alert("Quantity cannot be less than 1!")
    }
    else{
      this.orderService.updateItem(id, quantity).subscribe(_ => this.ngOnInit());
    }
  }

  deleteItem(id: Guid){
    this.orderService.deleteItem(id).subscribe(_ => this.ngOnInit());
  }
}
