import { roleRequestStatus } from './../../../models/enums/roleRequestStatus';
import { OwnerRequestService } from './../../../services/owner-request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-owner-request-list',
  templateUrl: './owner-request-list.component.html',
  styleUrls: ['./owner-request-list.component.css']
})
export class OwnerRequestListComponent implements OnInit {

  constructor(private requestService:OwnerRequestService) { }

  searchParam: string;
  roleRequestStatus = roleRequestStatus;
  statuses() : Array<string> {
      var keys = Object.keys(this.roleRequestStatus);
      return keys.slice(keys.length / 2);
  }
  
  selectedRoleRequestStatus: string;  

  ngOnInit(): void {
    this.selectedRoleRequestStatus = this.statuses()[0];
    console.log(this.statuses());
  }

  onSearch(){

  }
}
