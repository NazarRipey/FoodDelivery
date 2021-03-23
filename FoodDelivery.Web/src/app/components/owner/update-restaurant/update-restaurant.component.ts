import { restaurant } from 'src/app/models/restaurant/restaurant';
import { userHelper } from './../../../helpers/userHelper';
import { RestaurantService } from './../../../services/restaurant.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { restaurantErrors } from './../../../errors/restaurantErrors';
import { FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css']
})
export class UpdateRestaurantComponent implements OnInit {
  public addresses: FormArray;
  restaurantErrors = restaurantErrors;
  restaurant: restaurant;

  updateRestaurantForm = new FormGroup({
    description: new FormControl('', [
      Validators.required,
    ])
  });

  constructor(public modalRef: NgbActiveModal,
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private userHelper: userHelper) { }

  ngOnInit(): void {
    this.updateRestaurantForm.patchValue({description: this.restaurant.description});
  }

  onSubmit(){
    const restaurant :restaurant = {
      id: this.restaurant.id,
      ownerId: this.userHelper.profile.id,
      name: this.restaurant.name,
      description: this.updateRestaurantForm.get('description').value,
      type: this.restaurant.type,
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
