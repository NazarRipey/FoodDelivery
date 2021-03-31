import { DishService } from './../../services/dish.service';
import { dishCartObject } from '../../models/dish/dishCartObject';
import { LogInComponent } from './../auth/log-in/log-in.component';
import { userHelper } from './../../helpers/userHelper';
import { Guid } from 'guid-typescript';
import { imgSrc } from './../../app.module';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css'],
  animations:[
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition(':leave', animate(600, style({ opacity: 0 })))
    ])
  ]
})
export class AddToCartComponent implements OnInit {
  dishId: Guid;

  dish: dishCartObject;
  imgSrc = imgSrc;
  itemCount;

  added: boolean = false;
  addedQuantity: number;

  constructor(public modalRef: NgbActiveModal,
    private userHelper:userHelper,
    private modalService: NgbModal,
    private dishService:DishService,
    private router: Router) { }

  ngOnInit(): void {
    this.itemCount = 1;
    this.dishService.getCartDishById(this.dishId).subscribe(d => {
      this.dish = d
    });
  }

  Increment(){
    this.itemCount++;
  }

  Decrement(){
    this.itemCount--;
  }

  AddToCart(dishId: Guid, quantity: number){
    if(!this.userHelper.profile){
      this.modalService.open(LogInComponent, {centered: true});
    }
    else{
      this.addedQuantity = quantity;
      this.added = true;

      setTimeout(() => {
        this.added = false;
      }, 1500);
    }
  }

  ShowDetails(){
    this.router.navigateByUrl(`/dishes/${this.dishId}`);
    this.modalRef.close();
  }
}
