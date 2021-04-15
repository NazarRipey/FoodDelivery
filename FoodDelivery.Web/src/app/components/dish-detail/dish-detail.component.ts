import { ModalHelper } from './../../helpers/ModalHelper';
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
  styleUrls: ['./dish-detail.component.css']
})

export class DishDetailComponent implements OnInit {
  imgSrc = imgSrc;
  dish: DishDetail;
  itemCount: number;

  added: boolean = false;
  addedQuantity: number;

  constructor(private route:ActivatedRoute,
    private dishService:DishService,
    private modalHelper:ModalHelper) { }

  ngOnInit(): void {
    this.itemCount = 1;
    const id = this.route.snapshot.paramMap.get('id');
    
    this.dishService.getDetailDishById(id).subscribe(d => {
      this.dish = d
    });
  }

  AddToCart(dishId: Guid){
    this.modalHelper.openAddToCart(dishId);
  }
}
