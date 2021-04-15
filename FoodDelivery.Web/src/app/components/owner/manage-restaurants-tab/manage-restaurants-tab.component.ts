import { UserHelper } from './../../../helpers/UserHelper';
import { OwnerRequestStatus } from './../../../models/enums/statuses/OwnerRequestStatus';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { RestaurantService } from './../../../services/restaurant.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-restaurants-tab',
  templateUrl: './manage-restaurants-tab.component.html',
  styleUrls: ['./manage-restaurants-tab.component.css']
})
export class ManageRestaurantsTabComponent implements OnInit {
  restaurantNames: string[] = [];
  ownerRequestStatus = OwnerRequestStatus;

  constructor(private restaurantService:RestaurantService,
    private modalService: NgbModal,
    public userHelper:UserHelper) { }

  ngOnInit(): void {
    this.getNames();
  }

  addRestaurant(){
    const modal = this.modalService.open(AddRestaurantComponent);

    modal.result.then((result) => {
      this.getNames();
    });
  }

  getNames(){
    this.restaurantService.getNamesByOwner().subscribe(n => {
      this.restaurantNames = n;
    });
  }
}
