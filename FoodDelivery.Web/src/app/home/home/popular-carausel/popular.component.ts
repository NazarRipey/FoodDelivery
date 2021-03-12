import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {

  constructor(config: NgbCarouselConfig) {  
    config.interval = 10000;  
    config.wrap = true;  
    config.keyboard = false;  
    config.pauseOnHover = true;  
  }  

  ngOnInit(): void {
  }

}
