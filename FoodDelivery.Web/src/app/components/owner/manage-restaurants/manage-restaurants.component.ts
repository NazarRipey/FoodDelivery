import { userHelper } from './../../../helpers/userHelper';
import { restaurants } from './../../../app.module';
import { Restaurant } from './../../../models/restaurant';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-restaurants',
  templateUrl: './manage-restaurants.component.html',
  styleUrls: ['./manage-restaurants.component.css']
})
export class ManageRestaurantsComponent implements OnInit {

  restaurants: Restaurant[] = restaurants;

  constructor(public userHelper:userHelper) { }

  ngOnInit(): void {
  }

}
