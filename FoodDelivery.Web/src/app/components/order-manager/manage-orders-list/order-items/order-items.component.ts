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
  header: string;
  enableEditing: boolean = false;
  total: number;

  constructor(public modalRef: NgbActiveModal,
    private orderService:OrderService) {
    }

  ngOnInit(): void {
    console.log(this.items);
    this.orderService.getOrderItems(this.orderId.toString()).subscribe(i => {
      this.items = i;
      this.calculateSum();
    });
  }

  updateQuantity(i: number, quantity: number){
    if(quantity <= 0){
      alert("Quantity cannot be less than 1!")
    }
    else{
      this.orderService.updateItem(this.items[i].id, quantity).subscribe(_ =>
        {
          this.orderService.getOrderItem(this.items[i].id.toString()).subscribe(o => {
            this.items[i] = o;  
            this.calculateSum();
          })
        }
      );
    }
  }

  private calculateSum(){
    this.total = this.items.reduce((a, b) => a + (b.dish.price * b.quantity || 0), 0);
  }

  deleteItem(i: number){
    this.orderService.deleteItem(this.items[i].id).subscribe(_ => {
      this.items.splice(i, 1);
      this.calculateSum();
    });
  }
}
