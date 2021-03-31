import { dishObject } from '../../../models/dish/dishObject';
import { DishService } from './../../../services/dish.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { dishListObject } from 'src/app/models/dish/dishListObject';
import { dishErrors } from '../../../models/enums/errors/dishErrors';
import { dishCategory } from './../../../models/dish/dishCategory';
import { Guid } from 'guid-typescript';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-dish',
  templateUrl: './update-dish.component.html',
  styleUrls: ['./update-dish.component.css']
})
export class UpdateDishComponent implements OnInit {
  categories: dishCategory[];
  dish: dishObject;
  dishErrors = dishErrors;

  updateDishForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl('', [
      Validators.required,
    ]),
    weight: new FormControl('', [
      Validators.required,
      Validators.min(10)
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.min(0.1),
    ])
  });

  constructor(public modalRef: NgbActiveModal,
    private dishService:DishService) { }

  ngOnInit(): void {
    this.updateDishForm.patchValue({
      name: this.dish.name,
      description: this.dish.description,
      price: this.dish.price,
      weight: this.dish.weight
    });
  }

  onSubmit(){
    const dish :dishObject = {
      id: this.dish.id,
      name: this.updateDishForm.get('name').value,
      description: this.updateDishForm.get('description').value,
      price: this.updateDishForm.get('price').value,
      weight: this.updateDishForm.get('weight').value,
      restaurantId: this.dish.restaurantId,
      category: this.dish.category
    }

    this.dishService.updateRestaurant(dish).subscribe(
      _ => {
        this.modalRef.close();
        document.location.reload();
      },
      err => {
        this.updateDishForm.setErrors({"server": +err.error});
      }
    );
  }
}
