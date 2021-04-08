import { Guid } from 'guid-typescript';
import { OrderService } from './../../../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFilterParams } from './../../../../models/filters/BaseFilterParams';
import { PaginationConfig } from './../../../../models/PaginationConfig';
import { AvailableOrderResponse } from './../../../../models/order/AvailableOrderResponse';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-available-orders',
  templateUrl: './available-orders.component.html',
  styleUrls: ['./available-orders.component.css']
})
export class AvailableOrdersComponent implements OnInit {
  ordersResponse: AvailableOrderResponse = new AvailableOrderResponse();
  config: PaginationConfig = new PaginationConfig();
  filterParams: BaseFilterParams = new BaseFilterParams();

  constructor(private route: ActivatedRoute,
    private router:Router,
    private orderService:OrderService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params.page ? +params.page : 1;
      this.config.itemsPerPage = 18;

      this.filterParams.search = params.search ? params.search : null;
    });    

    this.filterParams.currentPage = this.config.currentPage;
    this.filterParams.itemsPerPage = this.config.itemsPerPage;

    this.orderService.retrieveAvailable(this.filterParams).subscribe(o => {
      this.ordersResponse = o;
      this.config.totalItems = o.totalOrdersCount;
    })

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  takeOrder(orderId: Guid){
    this.orderService.takeOrder(orderId).subscribe(_ => {
      location.reload();
    })
  }

  pageChanged(event){
    this.router.navigate([], {queryParams: {page: event}, queryParamsHandling: 'merge'});
  }
}
