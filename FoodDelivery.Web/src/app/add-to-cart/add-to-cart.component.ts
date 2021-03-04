import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Dish } from '../models/dish';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  dish: Dish
  itemCount;

  constructor(public modalRef: NgbActiveModal) { }

  ngOnInit(): void {
    this.itemCount = 1;
  }

  Increment(){
    this.itemCount++;
  }

  Decrement(){
    this.itemCount--;
  }
}
