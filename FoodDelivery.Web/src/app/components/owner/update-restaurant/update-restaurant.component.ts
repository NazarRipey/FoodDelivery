import { Guid } from 'guid-typescript';
import { RestaurantUpdateModel } from '../../../models/restaurant/RestaurantUpdateModel';
import { RestaurantService } from './../../../services/restaurant.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RestaurantErrors } from '../../../models/enums/errors/RestaurantErrors';
import { FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css']
})
export class UpdateRestaurantComponent implements OnInit {
  public addresses: FormArray;
  restaurantErrors = RestaurantErrors;
  restaurantId: Guid;
  restaurantName: string;

  updateRestaurantForm = new FormGroup({
    description: new FormControl('', [
      Validators.required,
    ])
  });

  constructor(public modalRef: NgbActiveModal,
    private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.getUpdateRestaurantById(this.restaurantId.toString()).subscribe(r => {
      this.updateRestaurantForm.patchValue({description: r.description});
    })
  }

  onSubmit(){
    const restaurant :RestaurantUpdateModel = {
      id: this.restaurantId,
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
