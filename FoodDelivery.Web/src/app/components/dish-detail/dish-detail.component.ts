import { RateDish } from './../../models/dish/RateDish';
import { ModalHelper } from './../../helpers/ModalHelper';
import { UserHelper } from '../../helpers/UserHelper';
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
    private modalHelper:ModalHelper,
    public userHelper: UserHelper) { }

  ngOnInit(): void {
    this.itemCount = 1;
    const id = this.route.snapshot.paramMap.get('id');
    
    this.dishService.getDetailDishById(id).subscribe(d => {
      this.dish = d;
      if(!d.userRating){
        this.dish.userRating = 0;
      }
    });
  }

  AddToCart(dishId: Guid){
    this.modalHelper.openAddToCart(dishId);
  }

  rateDish(){
    const rateDish: RateDish = {
      userId: this.userHelper.profile.id,
      dishId: this.dish.id,
      rating: this.dish.userRating
    };

    this.dishService.rate(rateDish).subscribe(_ => {
      this.dishService.getRating(this.dish.id).subscribe(dr => this.dish.rating = dr);
    });
  }
}
