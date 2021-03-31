import { ownerRequestStatus } from './../../../../models/enums/statuses/ownerRequestStatus';
import { Guid } from 'guid-typescript';
import { ownerRequestFilterParams } from '../../../../models/filters/ownerRequestFilterParams';
import { ownerRequestResponse } from './../../../../models/ownerRequest/ownerRequestResponse';
import { paginationConfig } from 'src/app/models/paginationConfig';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerRequestService } from '../../../../services/owner-request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-owner-request-list',
  templateUrl: './owner-request-list.component.html',
  styleUrls: ['./owner-request-list.component.css']
})
export class OwnerRequestListComponent implements OnInit {
  config: paginationConfig = new paginationConfig();
  requestResponse :ownerRequestResponse = new ownerRequestResponse();
  requestFilterParams : ownerRequestFilterParams = new ownerRequestFilterParams();

  selectedStatus: string;

  statuses = ownerRequestStatus;

  constructor(private requestService:OwnerRequestService, 
    private route: ActivatedRoute, 
    private router: Router) {   
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params.page ? +params.page : 1;
      this.config.itemsPerPage = 18;

      this.requestFilterParams.search = params.search ? params.search : null;
      this.selectedStatus = params.status ? params.status : "All"; 
    });    
    
    this.requestFilterParams.itemsPerPage = this.config.itemsPerPage;
    this.requestFilterParams.currentPage = this.config.currentPage;
    this.requestFilterParams.status = this.statuses[`${this.selectedStatus}`];

    this.requestService.retrieve(this.requestFilterParams).subscribe(
      r => {
        this.requestResponse = r;
        this.config.totalItems = r.totalRequestsCount;
      },
      error => {
        console.log(error);
      }
    );

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  onSearch(searchPhrase){
    this.router.navigate([], {queryParams: {search: searchPhrase}, queryParamsHandling: 'merge'});
  }

  pageChanged(event){
    this.router.navigate([], {queryParams: {page: event}, queryParamsHandling: 'merge'});
  }

  Approve(id: Guid){
    this.requestService.approve(id).subscribe(
      _ => {
        location.reload();
      },
      error => {
        console.log(error)
      }
    )
  }

  Decline(id: Guid){
    this.requestService.decline(id).subscribe(
      _ => {
        location.reload();
      },
      error => {
        console.log(error)
      }
    )
  }
}
