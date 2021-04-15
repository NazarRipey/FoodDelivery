import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sort-drop-down',
  templateUrl: './sort-drop-down.component.html',
  styleUrls: ['./sort-drop-down.component.css']
})
export class SortDropDownComponent implements OnInit {

  @Input()
  selectedsortType: string;

  @Input()
  sortTypes;

  constructor() { }

  ngOnInit(): void {
  }

}
