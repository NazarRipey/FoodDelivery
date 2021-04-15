import { MessageComponent } from './../../message/message.component';
import { CartHelper } from '../../../helpers/CartHelper';
import { CartItemModel } from '../../../models/cart/CartItemModel';
import { CartService } from './../../../services/cart.service';
import { DishService } from '../../../services/dish.service';
import { DishCart } from '../../../models/dish/DishCart';
import { LogInComponent } from '../../auth/log-in/log-in.component';
import { UserHelper } from '../../../helpers/UserHelper';
import { Guid } from 'guid-typescript';
import { imgSrc } from '../../../globals';
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

  dish: DishCart;
  imgSrc = imgSrc;
  itemCount;

  showDetail: boolean = false;

  added: boolean = false;
  addedQuantity: number;

  constructor(public modalRef: NgbActiveModal,
    private userHelper:UserHelper,
    private modalService: NgbModal,
    private dishService:DishService,
    private router: Router,
    private cartService: CartService,
    private cartHelper: CartHelper) { }

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
    else if(!this.userHelper.isInRole(['customer'])){
      const modal = this.modalService.open(MessageComponent);
      modal.componentInstance.message = `Only users with role customers can add items to cart!`;
    }
    else{
      const cartItemModel: CartItemModel = {
        dishId: dishId, quantity: quantity
      }

      this.cartService.addItem(cartItemModel).subscribe(_ => {
        this.addedQuantity = quantity;
        this.added = true;
  
        this.cartHelper.getInfo().subscribe();

        setTimeout(() => {
          this.added = false;
        }, 1000);
      }, error => {
        console.log(error);
      })
    }
  }

  ShowDetails(){
    this.router.navigateByUrl(`/dishes/${this.dishId}`);
    this.modalRef.close();
  }
}
