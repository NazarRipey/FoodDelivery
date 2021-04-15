import { AccountService } from './../../../services/account.service';
import { UserAccount } from './../../../models/userProfile/UserAccount';
import { AccountStatus } from './../../../models/enums/statuses/AccountStatus';
import { ActivatedRoute, Router } from '@angular/router';
import { UserFilterParams } from '../../../models/filters/UserFilterParams';
import { PaginationConfig } from '../../../models/PaginationConfig';
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
  userList: UserAccount[] =  [];
  userFilterParams: UserFilterParams = new UserFilterParams();

  statuses = AccountStatus;
  selectedStatus: string;

  constructor(private modalService: NgbModal,
    private accountService:AccountService,
    private route: ActivatedRoute,
    private router: Router) {
    }

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

    this.retrieveManagers();

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  openAddManager(){
    const modal = this.modalService.open(AddOrderManagerComponent);

    modal.result.then((result) => {
      this.retrieveManagers();
    });
  }

  activate(i: number){
    this.accountService.activateAccount(this.userList[i].email).subscribe(
      _ => {
        this.accountService.getUserAccount(this.userList[i].id.toString()).subscribe(a => {
          this.userList[i] = a;
        })
      }
    );
  }

  deactivate(i: number){
    this.accountService.deactivateAccount(this.userList[i].email).subscribe(
      _ => {
        this.accountService.getUserAccount(this.userList[i].id.toString()).subscribe(a => {
          this.userList[i] = a;
        })
      },
    );
  }

  pageChanged(event){
    this.router.navigate([], {queryParams: {page: event}, queryParamsHandling: 'merge'});
  }

  private retrieveManagers(){
    this.accountService.retrieveOrderManagers(this.userFilterParams).subscribe(
      r => {
        this.userList = r.users;
        this.config.totalItems = r.totalUsersCount;
      },
      error => {
        console.log(error);
      }
    );
  }
}
