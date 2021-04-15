import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-drop-down',
  templateUrl: './status-drop-down.component.html',
  styleUrls: ['./status-drop-down.component.css']
})
export class StatusDropDownComponent implements OnInit {

  @Input()
  selectedStatus: string;

  @Input()
  statuses;

  constructor() { }

  ngOnInit(): void {
  }

}
