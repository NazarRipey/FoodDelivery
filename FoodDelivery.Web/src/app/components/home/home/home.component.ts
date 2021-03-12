import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Restaurant } from '../../../models/restaurant';
import { Dish } from '../../../models/dish';
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
