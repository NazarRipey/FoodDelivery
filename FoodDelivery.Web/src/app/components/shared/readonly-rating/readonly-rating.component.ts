import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-readonly-rating',
  templateUrl: './readonly-rating.component.html',
  styleUrls: ['./readonly-rating.component.css']
})
export class ReadonlyRatingComponent implements OnInit {
  @Input()
  average: number;
  @Input()
  ratedCount: number;

  constructor() { }

  ngOnInit(): void {
  }

}
