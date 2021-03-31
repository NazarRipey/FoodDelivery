import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { restaurantDetailObject } from '../../../models/restaurant/restaurantDetailObject';
import { dishListObject } from '../../../models/dish/dishListObject';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(config: NgbCarouselConfig) {  
    config.interval = 4000;  
    config.keyboard = true;  
    config.pauseOnHover = true;  
  } 

  ngOnInit(): void {
  }
}
