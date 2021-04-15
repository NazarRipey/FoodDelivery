import { OrderStatus } from '../../../models/enums/statuses/OrderStatus';
import { OrderShort } from '../../../models/order/OrderShort';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.css']
})
export class OrderListItemComponent implements OnInit {

  @Input()
  order: OrderShort;

  statuses = OrderStatus;

  constructor() { }

  ngOnInit(): void {
  }
}
