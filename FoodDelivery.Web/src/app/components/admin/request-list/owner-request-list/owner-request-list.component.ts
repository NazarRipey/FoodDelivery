import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OwnerRequest } from './../../../../models/ownerRequest/OwnerRequest';
import { OwnerRequestStatus } from '../../../../models/enums/statuses/OwnerRequestStatus';
import { Guid } from 'guid-typescript';
import { OwnerRequestFilterParams } from '../../../../models/filters/OwnerRequestFilterParams';
import { OwnerRequestResponse } from '../../../../models/ownerRequest/OwnerRequestResponse';
import { PaginationConfig } from 'src/app/models/PaginationConfig';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerRequestService } from '../../../../services/owner-request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-owner-request-list',
  templateUrl: './owner-request-list.component.html',
  styleUrls: ['./owner-request-list.component.css']
})
export class OwnerRequestListComponent implements OnInit {
  config: PaginationConfig = new PaginationConfig();
  requests$;
  requestFilterParams : OwnerRequestFilterParams = new OwnerRequestFilterParams();

  selectedStatus: string;

  statuses = OwnerRequestStatus;

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

    this.retrieveRequests();

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  pageChanged(event){
    this.router.navigate([], { queryParams: {page: event}, queryParamsHandling: 'merge' });
  }

  Approve(id: Guid){
    this.requestService.approve(id).subscribe(
      _ => {
        this.retrieveRequests();
      }
    )
  }

  Decline(id: Guid){
    this.requestService.decline(id).subscribe(
      _ => {
        this.retrieveRequests();
      }
    )
  }

  private retrieveRequests(){
    this.requests$ = Observable.interval(5000).startWith(0).mergeMap(_ => 
      this.requestService.retrieve(this.requestFilterParams)
      .pipe(map(r => 
        {
          this.config.totalItems = r.totalRequestsCount;
          return r.ownerRequests;
        })
      )
    );
  }
}
