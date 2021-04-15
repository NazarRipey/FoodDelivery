import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AccountService } from './../../../services/account.service';
import { UserFilterParams } from './../../../models/filters/UserFilterParams';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountStatus } from './../../../models/enums/statuses/AccountStatus';
import { PaginationConfig } from './../../../models/PaginationConfig';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  config: PaginationConfig = new PaginationConfig();
  users$;
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

    this.retrieveUsers();

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  activate(email: string){
    this.accountService.activateAccount(email).subscribe(
      _ => {
        this.retrieveUsers();
      }
    );
  }

  deactivate(email: string){
    console.log(email);
    this.accountService.deactivateAccount(email).subscribe(
      _ => {
        this.retrieveUsers();
      }
    );
  }

  pageChanged(event){
    this.router.navigate([], {queryParams: {page: event}, queryParamsHandling: 'merge'});
  }

  private retrieveUsers(){
    this.users$ = Observable.interval(5000).startWith(0).mergeMap(_ => 
      this.accountService.retrieveUsers(this.userFilterParams)
      .pipe(map(u => 
        {
          this.config.totalItems = u.totalUsersCount;
          return u.users;
        })
      )
    );
  }
}