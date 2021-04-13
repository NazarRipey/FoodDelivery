import { AccountService } from './../../../services/account.service';
import { UserFilterParams } from './../../../models/filters/UserFilterParams';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AccountStatus } from './../../../models/enums/statuses/AccountStatus';
import { BaseFilterParams } from './../../../models/filters/BaseFilterParams';
import { UserList } from './../../../models/userProfile/UserAccount';
import { PaginationConfig } from './../../../models/PaginationConfig';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  config: PaginationConfig = new PaginationConfig();
  userList: UserList[] = [];
  userFilterParams: UserFilterParams = new UserFilterParams();

  statuses = AccountStatus;
  selectedStatus: string;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params.page ? +params.page : 1;
      this.config.itemsPerPage = 18;
      this.selectedStatus = params.status ? params.status : "All"; 

      this.userFilterParams.search = params.search ? params.search : null;
    });    
    
    this.userFilterParams.itemsPerPage = this.config.itemsPerPage;
    this.userFilterParams.currentPage = this.config.currentPage;
    this.userFilterParams.status = this.statuses[`${this.selectedStatus}`];


    this.accountService.retrieveUsers(this.userFilterParams).subscribe(
      r => {
        this.userList = r.users;
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

  activate(email: string){
    this.accountService.activateAccount(email).subscribe(
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
    this.accountService.deactivateAccount(email).subscribe(
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