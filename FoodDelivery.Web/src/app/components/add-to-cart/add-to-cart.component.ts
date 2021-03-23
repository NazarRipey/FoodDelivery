import { RestaurantService } from './../../services/restaurant.service';
import { imgSrc } from './../../app.module';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { dish } from '../../models/dish/dish';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  dish: dish
  imgSrc = imgSrc;
  itemCount;

  restaurantName: string;

  constructor(public modalRef: NgbActiveModal,
    private restaurantService:RestaurantService) { }

  ngOnInit(): void {
    this.itemCount = 1;
    this.restaurantService.getNameById(this.dish.restaurantId).subscribe(name => this.restaurantName = name);
  }

  Increment(){
    this.itemCount++;
  }

  Decrement(){
    this.itemCount--;
  }
}
