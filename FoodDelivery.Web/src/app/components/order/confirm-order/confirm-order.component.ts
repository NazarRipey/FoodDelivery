import { Router } from '@angular/router';
import { UserHelper } from './../../../helpers/UserHelper';
import { MessageComponent } from './../../message/message.component';
import { OrderService } from './../../../services/order.service';
import { AddOrderModel } from '../../../models/order/AddOrderModel';
import { Guid } from 'guid-typescript';
import { PaymentType } from '../../../models/enums/PaymentType';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmOrderErrrors } from '../../../models/enums/errors/ConfirmOrderErrors';
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
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern("^\\+[0-9]{1,3}[0-9]{9}$")
    ]),
    address: new FormControl('', [
      Validators.required,
    ]),
    comment: new FormControl('')
  });

  errorsEnum = ConfirmOrderErrrors;
  paymentTypes = PaymentType;

  constructor(
    public modalRef: NgbActiveModal, 
    private orderService:OrderService,
    private modalService: NgbModal,
    private userHelper:UserHelper,
    private router: Router) { }

  ngOnInit(): void {
    this.confirmOrderForm.patchValue({
      phoneNumber: this.userHelper.profile.phoneNumber,
      address: this.userHelper.profile.address
    });
  }

  onSubmit(){
    var min = 1000;
    var max = 999999;
    var orderNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    const order: AddOrderModel = {
      cartId: this.cartId,
      orderNumber: orderNumber,
      contactPhoneNumber: this.confirmOrderForm.get('phoneNumber').value,
      address: this.confirmOrderForm.get('address').value,
      paymentType:this.paymentTypes[`${this.confirmOrderForm.get('paymentType').value}`],
      comment: this.confirmOrderForm.get('comment').value
    }

    this.orderService.addOrder(order).subscribe(_ => {
      const modal = this.modalService.open(MessageComponent);
      modal.componentInstance.message = `Order confirmed successfully.\n Order number: ${orderNumber}`;

      this.modalRef.close();

      modal.result.then((result) => {
        this.router.navigateByUrl("orders").then(_ => location.reload());
      }, (reason) => {
        this.router.navigateByUrl("orders").then(_ => location.reload());
      });

    }, error => {
      console.log(error);
    });
  }
}
