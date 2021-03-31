import { dishObject } from '../../../models/dish/dishObject';
import { restaurantDetailObject } from 'src/app/models/restaurant/restaurantDetailObject';
import { dishListObject } from 'src/app/models/dish/dishListObject';
import { dishErrors } from '../../../models/enums/errors/dishErrors';
import { DishService } from './../../../services/dish.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { dishCategory } from './../../../models/dish/dishCategory';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {
  restaurantId: Guid;
  categories: dishCategory[];
  dishErrors = dishErrors;

  addDishForm = new FormGroup({
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
    ]),
    category: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(public modalRef: NgbActiveModal,
    private dishService:DishService) { }

  ngOnInit(): void {
    this.dishService.getCategories().subscribe(c => this.categories = c);
  }

  onSubmit(){
    const dish :dishObject = {
      name: this.addDishForm.get('name').value,
      description: this.addDishForm.get('description').value,
      price: this.addDishForm.get('price').value,
      weight: this.addDishForm.get('weight').value,
      restaurantId: this.restaurantId,
      category: (this.addDishForm.get('category').value)
    }

    this.dishService.addDish(dish).subscribe(
      _ => {
        this.modalRef.close();
        location.reload();
      },
      err => {
        this.addDishForm.setErrors({"server": +err.error});
      }
    );
  }
}
