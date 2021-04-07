import { CartHelper } from '../../helpers/CartHelper';
import { CartService } from './../../services/cart.service';
import { CartItemModel } from '../../models/cart/CartItemModel';
import { LogInComponent } from './../auth/log-in/log-in.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserHelper } from '../../helpers/UserHelper';
import { trigger, transition, state, style, animate } from '@angular/animations';
import { DishDetail } from '../../models/dish/DishDetail';
import { Guid } from 'guid-typescript';
import { DishService } from './../../services/dish.service';
import { ActivatedRoute } from '@angular/router';
import { imgSrc } from './../../globals';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css'],
  animations:[
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition(':leave', animate(600, style({ opacity: 0 })))
    ])
  ]
})
export class DishDetailComponent implements OnInit {
  imgSrc = imgSrc;
  dish: DishDetail;
  itemCount: number;

  added: boolean = false;
  addedQuantity: number;

  constructor(private route:ActivatedRoute,
    private dishService:DishService,
    private userHelper: UserHelper,
    private modalService: NgbModal,
    private cartService:CartService,
    private cartHelper:CartHelper) { }

  ngOnInit(): void {
    this.itemCount = 1;
    const id = this.route.snapshot.paramMap.get('id');
    
    this.dishService.getDetailDishById(id).subscribe(d => this.dish = d);
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
}
