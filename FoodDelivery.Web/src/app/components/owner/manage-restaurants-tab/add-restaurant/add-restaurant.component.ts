import { IFileDetails } from './../../../../models/IFileDetails';
import { RestaurantAddModel } from '../../../../models/restaurant/RestaurantAddModel';
import { MessageComponent } from '../../../message/message.component';
import { UserHelper } from '../../../../helpers/UserHelper';
import { RestaurantErrors } from '../../../../models/enums/errors/RestaurantErrors';
import { RestaurantService } from '../../../../services/restaurant.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantType } from '../../../../models/restaurant/RestaurantType';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {
  types: RestaurantType[];

  selectedImage: IFileDetails = null;

  public addresses: FormArray;
  restaurantErrors = RestaurantErrors

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
    private userHelper: UserHelper,
    private modalService:NgbModal){
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

  onImageSelected(event){
    const e = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const details = {
        contentType: e.type,
        fileName: e.name,
        data: reader.result,
      };

      this.selectedImage = details as IFileDetails;
    };

    if(e){
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  uploadImage(){
    alert("uploaded");
  }

  onSubmit(){
    const restaurant :RestaurantAddModel = {
      ownerId: this.userHelper.profile.id,
      name: this.addRestaurantForm.get('name').value,
      description: this.addRestaurantForm.get('description').value,
      type: this.addRestaurantForm.get('type').value,
      addresses: this.addresses.value,
      image: this.selectedImage
    }

    this.restaurantService.addRestaurant(restaurant).subscribe(
      _ => {
        let msg = "Restaurant request has been successfully added. You will be able to add dishes once the request is approved";        
        const modal = this.modalService.open(MessageComponent);
        modal.componentInstance.message = msg;

        modal.result.then((result) => {
          this.modalRef.close();
        }, (reason) => {
          this.modalRef.close();
        });
      },
      err => {
        this.addRestaurantForm.setErrors({"server": +err.error});
      }
    );
  }
}
