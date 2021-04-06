import { Guid } from 'guid-typescript';
import { RestaurantAddress } from '../../../models/restaurant/RestaurantAddress';
import { RestaurantService } from './../../../services/restaurant.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  restaurantId: Guid;

  addAddressForm = new FormGroup({
    city: new FormControl('', [
      Validators.required,
    ]),
    address: new FormControl('', [
      Validators.required,
    ])
  });

  constructor(public modalRef: NgbActiveModal,
    private restaurantService: RestaurantService,
    ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const restaurantAddress :RestaurantAddress = {
      restaurantId: this.restaurantId,
      city: this.addAddressForm.get('city').value,
      address: this.addAddressForm.get('address').value,
    }

    this.restaurantService.addAddress(restaurantAddress).subscribe(
      _ => {
        this.modalRef.close();
        location.reload();
      },
      err => {
        this.addAddressForm.setErrors({"server": +err.error});
      }
    );
  }
}
