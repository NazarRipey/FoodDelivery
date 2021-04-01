import { restaurantUpdateObject } from './../../../models/restaurant/restaurantUpdateObject';
import { restaurantDetailObject } from 'src/app/models/restaurant/restaurantDetailObject';
import { userHelper } from './../../../helpers/userHelper';
import { RestaurantService } from './../../../services/restaurant.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { restaurantErrors } from '../../../models/enums/errors/restaurantErrors';
import { FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css']
})
export class UpdateRestaurantComponent implements OnInit {
  public addresses: FormArray;
  restaurantErrors = restaurantErrors;
  restaurant: restaurantDetailObject;

  updateRestaurantForm = new FormGroup({
    description: new FormControl('', [
      Validators.required,
    ])
  });

  constructor(public modalRef: NgbActiveModal,
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private userHelper: userHelper,
    private router: Router) { }

  ngOnInit(): void {
    this.updateRestaurantForm.patchValue({description: this.restaurant.description});
  }

  onSubmit(){
    const restaurant :restaurantUpdateObject = {
      id: this.restaurant.id,
      description: this.updateRestaurantForm.get('description').value,
    }

    this.restaurantService.updateRestaurant(restaurant).subscribe(
      _ => {
        this.modalRef.close();
        location.reload();
      },
      err => {
        this.updateRestaurantForm.setErrors({"server": +err.error});
      }
    );
  }
}
