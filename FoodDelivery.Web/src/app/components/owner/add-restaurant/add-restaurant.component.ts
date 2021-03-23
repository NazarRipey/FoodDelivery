import { userHelper } from './../../../helpers/userHelper';
import { imgSrc } from './../../../app.module';
import { restaurantErrors } from './../../../errors/restaurantErrors';
import { RestaurantService } from './../../../services/restaurant.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { restaurantType } from '../../../models/restaurant/restaurantType';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { restaurant } from 'src/app/models/restaurant/restaurant';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {
  types: restaurantType[];

  public addresses: FormArray;
  restaurantErrors = restaurantErrors

  addRestaurantForm = new FormGroup({
    name: new FormControl('', [
        Validators.required,
      ]),
    description: new FormControl('', [
      Validators.required,
    ]),
    type: new FormControl('', [
      Validators.required,
    ]),
    addresses: this.fb.array([this.createAddress()])
  });

  constructor(public modalRef: NgbActiveModal,
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private userHelper: userHelper){
  }

  ngOnInit(): void {
    this.addresses = this.addRestaurantForm.get('addresses') as FormArray;
    this.restaurantService.getTypes().subscribe(t => this.types = t);
  }

  createAddress(): FormGroup {
    return this.fb.group({
      city: new FormControl('', [
        Validators.required,
      ]),
      address: new FormControl('', [
        Validators.required,
      ])
    });
  }

  get addressControls() {
    return this.addRestaurantForm.get('addresses')['controls'];
  }

  addAddress(){
    this.addresses = this.addRestaurantForm.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());
  }

  removeAddress(i: number) {
    this.addresses.removeAt(i);
  }

  onSubmit(){
    const restaurant :restaurant = {
      ownerId: this.userHelper.profile.id,
      name: this.addRestaurantForm.get('name').value,
      description: this.addRestaurantForm.get('description').value,
      type: this.addRestaurantForm.get('type').value,
      addresses: this.addresses.value
    }

    this.restaurantService.addRestaurant(restaurant).subscribe(
      _ => {
        this.modalRef.close();
        location.reload();
      },
      err => {
        this.addRestaurantForm.setErrors({"server": +err.error});
      }
    );
  }
}
