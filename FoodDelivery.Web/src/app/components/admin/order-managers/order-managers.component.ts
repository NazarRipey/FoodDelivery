import { AccountStatus } from './../../../models/enums/statuses/AccountStatus';
import { Guid } from 'guid-typescript';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderManagerFilterParams } from '../../../models/filters/OrderManagerFilterParams';
import { UserListResponse } from './../../../models/userProfile/UserListResponse';
import { PaginationConfig } from '../../../models/PaginationConfig';
import { AuthenticationService } from './../../../services/authentication.service';
import { AddOrderManagerComponent } from './add-order-manager/add-order-manager.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-managers',
  templateUrl: './order-managers.component.html',
  styleUrls: ['./order-managers.component.css']
})
export class OrderManagersComponent implements OnInit {
  config: PaginationConfig = new PaginationConfig();
  userListResponse: UserListResponse =  new UserListResponse();
  orderManagerFilterParams: OrderManagerFilterParams = new OrderManagerFilterParams();

  statuses = AccountStatus;
  selectedStatus: string;

  constructor(private modalService: NgbModal,
    private authService:AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) {
    }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params.page ? +params.page : 1;
      this.config.itemsPerPage = 18;
      this.selectedStatus = params.status ? params.status : "All"; 

      this.orderManagerFilterParams.search = params.search ? params.search : null;
    });    
    
    this.orderManagerFilterParams.itemsPerPage = this.config.itemsPerPage;
    this.orderManagerFilterParams.currentPage = this.config.currentPage;
    this.orderManagerFilterParams.status = this.statuses[`${this.selectedStatus}`];

    this.authService.retrieveOrderManagers(this.orderManagerFilterParams).subscribe(
      r => {
        this.userListResponse = r;
        this.config.totalItems = r.totalUsersCount;
      },
      error => {
        console.log(error);
      }
    );

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  openAddManager(){
    this.modalService.open(AddOrderManagerComponent);
  }

  activate(email: string){
    this.authService.activateAccount(email).subscribe(
      _ => {
        location.reload();
      },
      error => {
        console.log(error)
      }
    );
  }

  deactivate(email: string){
    console.log(email);
    this.authService.deactivateAccount(email).subscribe(
      _ => {
        location.reload();
      },
      error => {
        console.log(error)
      }
    );
  }

  pageChanged(event){
    this.router.navigate([], {queryParams: {page: event}, queryParamsHandling: 'merge'});
  }
}
