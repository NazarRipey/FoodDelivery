import { UpdateOrderModel } from './../../../models/order/UpdateOrderModel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { OrderService } from './../../../services/order.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {

  orderId: Guid;
  orderNumber: number;

  updateOrderForm = new FormGroup({
    address: new FormControl('', [
      Validators.required
    ]),
    comment: new FormControl('')
  });

  constructor(public modalRef: NgbActiveModal, private orderService:OrderService) { }

  ngOnInit(): void {
    this.orderService.getUpdateOrderById(this.orderId.toString()).subscribe(o => {
      this.orderNumber = o.orderNumber;
      this.updateOrderForm.patchValue({
        address: o.address,
        comment: o.comment,
      });
    })
  }

  onSubmit(){
    const order :UpdateOrderModel = {
      id: this.orderId,
      orderNumber: this.orderNumber,
      address: this.updateOrderForm.get('address').value,
      comment: this.updateOrderForm.get('comment').value,
    }

    this.orderService.updateOrder(order).subscribe(
      _ => {
        this.modalRef.close();
        location.reload();
      },
      err => {
        this.updateOrderForm.setErrors({"server": +err.error});
      }
    );
  }
}
