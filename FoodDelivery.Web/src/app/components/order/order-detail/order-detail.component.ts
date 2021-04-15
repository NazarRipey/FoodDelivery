import { ConfirmDialogComponent } from './../../confirm-dialog/confirm-dialog.component';
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
  orderId: string;

  order: OrderDetail;
  
  statuses = OrderStatus;
  paymentTypes = PaymentType;

  constructor(private route: ActivatedRoute,
    private orderService:OrderService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.getOrder();
  }

  updateOrder(id: Guid){
    const modal = this.modalService.open(UpdateOrderComponent);
    modal.componentInstance.orderId = id; 

    modal.result.then((result) => {
      this.getOrder();
    });
  }

  cancelOrder(id: Guid){
    const modal = this.modalService.open(ConfirmDialogComponent);
    modal.componentInstance.confirmHeader = "Order cancellation";
    modal.componentInstance.confirmMessage = `Are you sure you want to cancel order?`;

    modal.result.then((result) => {
      if(result == true){
        this.orderService.cancelOrder(id).subscribe(_ => {
          this.getOrder();
        });
      }
    });
  }

  private getOrder(){
    this.orderService.getDetailOrderById(this.orderId).subscribe(o => this.order = o);
  }
}
