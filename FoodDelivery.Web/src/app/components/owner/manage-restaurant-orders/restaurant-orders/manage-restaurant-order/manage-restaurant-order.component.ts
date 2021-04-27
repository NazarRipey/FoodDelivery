import { RestaurantOrderService } from './../../../../../services/restaurant-order.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { RestaurantOrderItem } from './../../../../../models/restaurantOrder/RestaurantOrderItem';
import { Component, OnInit } from '@angular/core';
import { OrderItemStatus } from 'src/app/models/enums/statuses/OrderItemStatus';

@Component({
  selector: 'app-manage-restaurant-order',
  templateUrl: './manage-restaurant-order.component.html',
  styleUrls: ['./manage-restaurant-order.component.css']
})
export class ManageRestaurantOrderComponent implements OnInit {

  items: RestaurantOrderItem[] = [];
  total: number;

  itemStatuses = OrderItemStatus;
  restaurantOrderId: Guid;

  constructor(public modalRef: NgbActiveModal,
    private restaurantOrderService: RestaurantOrderService) { }

  ngOnInit(): void {
    this.retrieveRestaurantOrderItems();
  }

  cooked(item: RestaurantOrderItem){
    this.restaurantOrderService.makeReady(item).subscribe(_ => {
      this.retrieveRestaurantOrderItems();
    })
  }

  retrieveRestaurantOrderItems(){
    this.restaurantOrderService.getRestaurantOrderItems(this.restaurantOrderId).subscribe(roi => {
      this.items = roi;
      if(this.items){
        this.calculateTotal();
      }
    });
  }

  private calculateTotal(){
    this.total = this.items.reduce((a, b) => a + (b.orderItem.dish.price * b.orderItem.quantity || 0), 0);
  }
}
