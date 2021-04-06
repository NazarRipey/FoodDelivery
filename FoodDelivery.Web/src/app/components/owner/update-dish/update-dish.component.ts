import { DishUpdateModel } from '../../../models/dish/DishUpdateModel';
import { DishAddModel } from '../../../models/dish/DishAddModel';
import { DishService } from './../../../services/dish.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DishErrors } from '../../../models/enums/errors/DishErrors';
import { DishCategory } from '../../../models/dish/DishCategory';
import { Guid } from 'guid-typescript';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-dish',
  templateUrl: './update-dish.component.html',
  styleUrls: ['./update-dish.component.css']
})
export class UpdateDishComponent implements OnInit {
  categories: DishCategory[];
  dishErrors = DishErrors;

  dishId: Guid;
  dishName: string;

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
    this.dishService.getUpdateDishById(this.dishId.toString()).subscribe(d => {
      this.dishName = d.name;
      this.updateDishForm.patchValue({
        name: this.dishName,
        description: d.description,
        price: d.price,
        weight: d.weight
      });
    })
  }

  onSubmit(){
    const dish :DishUpdateModel = {
      id: this.dishId,
      name: this.updateDishForm.get('name').value,
      description: this.updateDishForm.get('description').value,
      price: this.updateDishForm.get('price').value,
      weight: this.updateDishForm.get('weight').value,
    }

    this.dishService.updateDish(dish).subscribe(
      _ => {
        this.modalRef.close();
        location.reload();
      },
      err => {
        this.updateDishForm.setErrors({"server": +err.error});
      }
    );
  }
}
