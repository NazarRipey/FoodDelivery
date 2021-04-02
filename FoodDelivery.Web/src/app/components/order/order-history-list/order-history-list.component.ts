import { paymentType } from './../../../models/enums/paymentType';
import { orderStatus } from './../../../models/enums/statuses/orderStatus';
import { ActivatedRoute, Router } from '@angular/router';
import { orderFilterParams } from './../../../models/filters/orderFilterParams';
import { paginationConfig } from './../../../models/paginationConfig';
import { orderResponse } from './../../../models/order/orderResponse';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-history-list',
  templateUrl: './order-history-list.component.html',
  styleUrls: ['./order-history-list.component.css']
})
export class OrderHistoryListComponent implements OnInit {
  orderResponse: orderResponse = new orderResponse();
  orderFilterParams: orderFilterParams = new orderFilterParams();
  config: paginationConfig = new paginationConfig(); 

  statuses = orderStatus;

  constructor(private orderService:OrderService,
    private route:ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params.page ? +params.page : 1;
      this.config.itemsPerPage = 18;
      this.orderFilterParams.search = params.search ? params.search : null;
    });  

    this.orderFilterParams.itemsPerPage = this.config.itemsPerPage;
    this.orderFilterParams.currentPage = this.config.currentPage;

    this.orderService.retrieveAll(this.orderFilterParams).subscribe(o => {
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
