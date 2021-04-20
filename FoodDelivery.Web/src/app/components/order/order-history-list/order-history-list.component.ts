import { itemsPerPage } from './../../../globals';
import { OrderStatus } from '../../../models/enums/statuses/OrderStatus';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderFilterParams } from '../../../models/filters/OrderFilterParams';
import { PaginationConfig } from '../../../models/PaginationConfig';
import { OrderResponse } from '../../../models/order/OrderResponse';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-history-list',
  templateUrl: './order-history-list.component.html',
  styleUrls: ['./order-history-list.component.css']
})
export class OrderHistoryListComponent implements OnInit {
  orderResponse: OrderResponse = new OrderResponse();
  orderFilterParams: OrderFilterParams = new OrderFilterParams();
  config: PaginationConfig = new PaginationConfig(); 

  statuses = OrderStatus;
  selectedStatus: string;

  constructor(private orderService:OrderService,
    private route:ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params.page ? +params.page : 1;
      this.config.itemsPerPage = itemsPerPage;
      this.selectedStatus = params.status ? params.status : "All"; 
      this.orderFilterParams.search = params.search ? params.search : null;
    });  

    this.orderFilterParams.itemsPerPage = this.config.itemsPerPage;
    this.orderFilterParams.currentPage = this.config.currentPage;
    this.orderFilterParams.status = this.statuses[`${this.selectedStatus}`];

    this.orderService.retrieveHistory(this.orderFilterParams).subscribe(o => {
      this.orderResponse = o;
      this.config.totalItems = o.totalOrdersCount;
    });

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  pageChanged(event){
    this.router.navigate([], {queryParams: {page: event}, queryParamsHandling: 'merge'});
  }

  onSearch(searchPhrase){
    this.router.navigate([], {queryParams: {search: searchPhrase}, queryParamsHandling: 'merge'});
  }
}
