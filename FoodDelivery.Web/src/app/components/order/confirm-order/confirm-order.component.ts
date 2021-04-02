import { MessageComponent } from './../../message/message.component';
import { OrderService } from './../../../services/order.service';
import { addOrderObject } from './../../../models/order/addOrderObject';
import { Guid } from 'guid-typescript';
import { paymentType } from './../../../models/enums/paymentType';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { confirmOrderErrrors } from './../../../models/enums/errors/confirmOrderErrors';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {

  cartId: Guid;

  confirmOrderForm = new FormGroup({
    paymentType: new FormControl('', [
        Validators.required,
      ]),
    address: new FormControl('', [
      Validators.required,
    ]),
    comment: new FormControl('')
  });

  errorsEnum = confirmOrderErrrors;
  paymentTypes = paymentType;

  constructor(public modalRef: NgbActiveModal, 
    private orderService:OrderService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  onSubmit(){
    var min = 1000;
    var max = 999999;
    var orderNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    const order: addOrderObject = {
      cartId: this.cartId,
      orderNumber: orderNumber,
      address: this.confirmOrderForm.get('address').value,
      paymentType:this.paymentTypes[`${this.confirmOrderForm.get('paymentType').value}`],
      comment: this.confirmOrderForm.get('comment').value
    }

    this.orderService.addOrder(order).subscribe(_ => {
      const modal = this.modalService.open(MessageComponent);
      modal.componentInstance.message = `Order confirmed successfully.\n Order number: ${orderNumber}`;

      this.modalRef.close();

      modal.result.then((result) => {
        location.reload();
      }, (reason) => {
        location.reload();
      });

    }, error => {
      console.log(error);
    });
  }
}
