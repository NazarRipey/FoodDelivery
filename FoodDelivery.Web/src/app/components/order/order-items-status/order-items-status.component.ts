import { OrderItemStatus } from './../../../models/enums/statuses/OrderItemStatus';
import { OrderStatus } from './../../../models/enums/statuses/OrderStatus';
import { OrderService } from './../../../services/order.service';
import { RestaurantOrder } from './../../../models/restaurantOrder/RestaurantOrder';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-items-status',
  templateUrl: './order-items-status.component.html',
  styleUrls: ['./order-items-status.component.css']
})
export class OrderItemsStatusComponent implements OnInit {

  restaurantOrders: RestaurantOrder[];

  orderStatuses = OrderStatus;
  itemStatuses = OrderItemStatus;

  orderId: Guid;
  total: number;

  constructor(public modalRef: NgbActiveModal,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getRestaurantOrders(this.orderId).subscribe(ro => {
      this.restaurantOrders = ro;
      this.calculateSum();
    })
  }

  private calculateSum(){
    this.total = this.restaurantOrders.reduce((a, b) => a + (b.totalSum || 0), 0);
  }
}
