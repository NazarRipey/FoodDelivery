import { LogInComponent } from './../auth/log-in/log-in.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { userHelper } from './../../helpers/userHelper';
import { trigger, transition, state, style, animate } from '@angular/animations';
import { dishDetailObject } from './../../models/dish/dishDetailObject';
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
  dish: dishDetailObject;
  itemCount: number;

  added: boolean = false;
  addedQuantity: number;

  constructor(private route:ActivatedRoute,
    private dishService:DishService,
    private userHelper: userHelper,
    private modalService: NgbModal) { }

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
      this.addedQuantity = quantity;
      this.added = true;

      setTimeout(() => {
        this.added = false;
      }, 1500);
    }
  }
}
