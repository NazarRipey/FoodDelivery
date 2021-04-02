import { orderStatus } from './../../../models/enums/statuses/orderStatus';
import { orderShort } from './../../../models/order/orderShort';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-active-list',
  templateUrl: './order-active-list.component.html',
  styleUrls: ['./order-active-list.component.css']
})
export class OrderActiveListComponent implements OnInit {

  orders: orderShort[];
  statuses = orderStatus;

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.orderService.getActive().subscribe(o => this.orders = o);
  }
}
