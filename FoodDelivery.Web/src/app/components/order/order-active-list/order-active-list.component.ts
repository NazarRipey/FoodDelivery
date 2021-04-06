import { Guid } from 'guid-typescript';
import { OrderStatus } from '../../../models/enums/statuses/OrderStatus';
import { OrderShort } from '../../../models/order/OrderShort';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-active-list',
  templateUrl: './order-active-list.component.html',
  styleUrls: ['./order-active-list.component.css']
})
export class OrderActiveListComponent implements OnInit {

  orders: OrderShort[];
  statuses = OrderStatus;

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.orderService.getActive().subscribe(o => this.orders = o);
  }
}
