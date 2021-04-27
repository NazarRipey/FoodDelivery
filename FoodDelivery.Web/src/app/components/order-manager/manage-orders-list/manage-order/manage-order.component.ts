import { RestaurantOrderItem } from './../../../../models/restaurantOrder/RestaurantOrderItem';
import { RestaurantOrderService } from './../../../../services/restaurant-order.service';
import { OrderItemStatus } from './../../../../models/enums/statuses/OrderItemStatus';
import { OrderStatus } from './../../../../models/enums/statuses/OrderStatus';
import { map } from 'rxjs/operators';
import { OrderService } from './../../../../services/order.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { Component, OnInit } from '@angular/core';
import { RestaurantOrder } from 'src/app/models/restaurantOrder/RestaurantOrder';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {

  restaurantOrders: RestaurantOrder[];

  orderStatuses = OrderStatus;
  itemStatuses = OrderItemStatus;

  orderId: Guid;
  total: number;

  constructor(public modalRef: NgbActiveModal,
    private orderService: OrderService, 
    private restaurantOrderService: RestaurantOrderService) { }

  ngOnInit(): void {
    this.retrieveOrders();
  }

  approveQuantityRequestItem(item: RestaurantOrderItem){
    this.restaurantOrderService.approveQuantityRequestItem(item).subscribe(_ => {
      this.retrieveOrders();
    })
  }

  declineQuantityRequestItem(item: RestaurantOrderItem){
    this.restaurantOrderService.declineQuantityRequestItem(item).subscribe(_ => {
      this.retrieveOrders();
    })
  }

  cancelRestaurantOrder(restaurantOrder: RestaurantOrder){
    this.restaurantOrderService.cancelRestaurantOrder(restaurantOrder.id).subscribe(_ => {;
      this.retrieveOrders();
    })
  }

  private retrieveOrders(){
    this.orderService.getRestaurantOrders(this.orderId).subscribe(o => {
      this.restaurantOrders = o;
      if(this.restaurantOrders){
        this.calculateSum();
      }
    });
  }

  private calculateSum(){
    this.total = this.restaurantOrders.reduce((a, b) => a + b.totalSum || 0, 0);
  }
}
