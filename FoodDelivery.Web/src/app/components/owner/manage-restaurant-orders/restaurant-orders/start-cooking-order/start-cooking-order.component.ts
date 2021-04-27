import { RestaurantOrderService } from './../../../../../services/restaurant-order.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { RestaurantOrderItem } from './../../../../../models/restaurantOrder/RestaurantOrderItem';
import { Component, OnInit } from '@angular/core';
import { OrderItemStatus } from 'src/app/models/enums/statuses/OrderItemStatus';

@Component({
  selector: 'app-start-cooking-order',
  templateUrl: './start-cooking-order.component.html',
  styleUrls: ['./start-cooking-order.component.css']
})
export class StartCookingOrderComponent implements OnInit {

  items: RestaurantOrderItem[] = [];
  total: number;

  itemStatuses = OrderItemStatus;
  restaurantOrderId: Guid;

  constructor(public modalRef: NgbActiveModal,
    private restaurantOrderService: RestaurantOrderService) { }

  ngOnInit(): void {
    this.restaurantOrderService.getRestaurantOrderItems(this.restaurantOrderId).subscribe(roi => {
      this.items = roi;
      this.calculateTotal();
    });
  }

  startCooking(){
    this.restaurantOrderService.startCooking(this.restaurantOrderId).subscribe(_ => {
      this.modalRef.close();
    })
  }

  requestQuantityChange(){
    if(this.items.some(r => r.requestedQuantity == r.orderItem.quantity)){
      alert("For some item requested quantity is the same as current!");
    }
    if(this.items.some(r => r.requestedQuantity < 0)){
      alert("Requested quantity cannot be less than 0!");
    }
    else{
      let requestedQuantityItems: RestaurantOrderItem[] = this.items.filter(r => r.requestedQuantity);

      this.restaurantOrderService.requestQuantityChange(requestedQuantityItems).subscribe(_ =>{
        this.modalRef.close();
      })
    }
  }

  quantityChanged(): boolean{
    return this.items.some(r => r.requestedQuantity);
  }

  changeRequested(): boolean{
    return this.items.some(r => r.status == this.itemStatuses.ChangeQuantityRequested)
  }

  private calculateTotal(){
    this.total = this.items.reduce((a, b) => a + (b.orderItem.dish.price * b.orderItem.quantity || 0), 0);
  }
}
