import { RestaurantRequestSortType } from '../../../../models/enums/sorts/RestaurantRequestSortType';
import { Guid } from 'guid-typescript';
import { RestaurantRequestStatus } from '../../../../models/enums/statuses/RestaurantRequestStatus';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantRequestService } from './../../../../services/restaurant-request.service';
import { RestaurantRequestFilterParams } from '../../../../models/filters/RestaurantRequestFilterParams';
import { PaginationConfig } from '../../../../models/PaginationConfig';
import { Component, OnInit } from '@angular/core';
import { RestaurantRequestResponse } from 'src/app/models/restaurantRequest/RestaurantRequestResponse';

@Component({
  selector: 'app-restaurant-request-list',
  templateUrl: './restaurant-request-list.component.html',
  styleUrls: ['./restaurant-request-list.component.css']
})
export class RestaurantRequestListComponent implements OnInit {
  config: PaginationConfig = new PaginationConfig();
  requestResponse :RestaurantRequestResponse = new RestaurantRequestResponse();
  requestFilterParams : RestaurantRequestFilterParams = new RestaurantRequestFilterParams();

  selectedStatus: string;

  nameSort: boolean = false;
  typeSort: boolean = false;
  ownerNameSort: boolean = false;
  emailSort: boolean = false;
  phoneSort: boolean = false;
  createdDateSort: boolean = false;
  closedDateSort: boolean = false;
  statusSort: boolean = false;

  statuses = RestaurantRequestStatus;
  sortTypes = RestaurantRequestSortType;
  
  constructor(private requestService:RestaurantRequestService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params.page ? +params.page : 1;
      this.config.itemsPerPage = 18;

      this.requestFilterParams.search = params.search ? params.search : null;
      this.selectedStatus = params.status ? params.status : "All"; 
      this.requestFilterParams.sort = params.sort? +params.sort: null;
      this.requestFilterParams.asc = params.asc ? params.asc === 'true' : null;
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
