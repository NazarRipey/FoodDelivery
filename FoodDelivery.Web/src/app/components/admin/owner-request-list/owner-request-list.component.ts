import { ownerRequest } from './../../../models/ownerRequest';
import { ActivatedRoute, Router } from '@angular/router';
import { roleRequestStatus } from './../../../models/enums/roleRequestStatus';
import { OwnerRequestService } from './../../../services/owner-request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-owner-request-list',
  templateUrl: './owner-request-list.component.html',
  styleUrls: ['./owner-request-list.component.css']
})
export class OwnerRequestListComponent implements OnInit {

  constructor(private requestService:OwnerRequestService, 
    private route: ActivatedRoute, 
    private router: Router) { }

  requests: ownerRequest[];
  searchParam: string;
  roleRequestStatus = roleRequestStatus;
  statuses() : Array<string> {
      var keys = Object.keys(this.roleRequestStatus);
      return keys.slice(keys.length / 2);
  }
  selectedRoleRequestStatus: string;  

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedRoleRequestStatus = params.status ? params.status : null;
      this.searchParam = params.search ? params.search : null;
    });    

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    this.requestService.getRequests(this.selectedRoleRequestStatus).subscribe(
      r => {
        this.requests = r;
      },
      error => {
        console.log(error);
      }
    );
  }

  onSearch(){
    this.router.navigate([], {queryParams: {search: this.searchParam}, queryParamsHandling: 'merge'});
  }

  Approve(request: ownerRequest){
    this.requestService.approve(request).subscribe(
      _ => {
        location.reload();
      },
      error => {
        console.log(error)
      }
    )
  }

  Deny(request: ownerRequest){
    this.requestService.deny(request).subscribe(
      _ => {
        location.reload();
      },
      error => {
        console.log(error)
      }
    )
  }
}
