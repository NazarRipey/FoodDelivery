import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { PaymentType } from '../../../models/enums/PaymentType';
import { OrderStatus } from '../../../models/enums/statuses/OrderStatus';
import { OrderDetail } from '../../../models/order/OrderDetail';
import { OrderService } from './../../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UpdateOrderComponent } from '../update-order/update-order.component';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order: OrderDetail;
  
  statuses = OrderStatus;
  paymentTypes = PaymentType;

  constructor(private route: ActivatedRoute,
    private orderService:OrderService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.orderService.getDetailOrderById(id).subscribe(o => this.order = o);
  }

  updateOrder(id: Guid){
    const modal = this.modalService.open(UpdateOrderComponent);
    modal.componentInstance.orderId = id; 
  }
}
