import { CartService } from './../../services/cart.service';
import { dishes } from './../../app.module';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dish } from 'src/app/models/dish';
import { Observable } from 'rxjs';
import { AddToCartComponent } from 'src/app/add-to-cart/add-to-cart.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  constructor(private cartService:CartService, private route: ActivatedRoute) { }

  dishes: Dish[] = dishes;
  pageOfItems: Array<Dish>;

  @Input()
  pageSize;

  ngOnInit(): void {
  }

  onChangePage(pageOfItems: Array<Dish>){
    this.pageOfItems = pageOfItems;
  }

  openAddToCart(item: Dish){
    this.cartService.openAddToCart(item);
  }
}
