import { itemsPerPage } from './../../../../globals';
import { OrderStatus } from './../../../../models/enums/statuses/OrderStatus';
import { Guid } from 'guid-typescript';
import { ModalHelper } from '../../../../helpers/ModalHelper';
import { OrderService } from './../../../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFilterParams } from './../../../../models/filters/BaseFilterParams';
import { PaginationConfig } from './../../../../models/PaginationConfig';
import { OrderManager } from './../../../../models/order/OrderManager';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-order-history',
  templateUrl: './manager-order-history.component.html',
  styleUrls: ['./manager-order-history.component.css']
})
export class ManagerOrderHistoryComponent implements OnInit {
  orders: OrderManager[] = [];
  config: PaginationConfig = new PaginationConfig();
  filterParams: BaseFilterParams = new BaseFilterParams();

  statuses = OrderStatus;

  constructor(private route: ActivatedRoute,
    private router:Router,
    private orderService:OrderService,
    private modalHelper: ModalHelper) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params.page ? +params.page : 1;
      this.config.itemsPerPage = itemsPerPage;

      this.filterParams.search = params.search ? params.search : null;
    });    

    this.filterParams.currentPage = this.config.currentPage;
    this.filterParams.itemsPerPage = this.config.itemsPerPage;

    this.orderService.retrieveHistoryByManager(this.filterParams).subscribe(o => {
      this.orders = o.orders;
      this.config.totalItems = o.totalOrdersCount;
    })

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  showItems(id: Guid){
    this.modalHelper.openOrderItems(id);
  }

  pageChanged(event){
    this.router.navigate([], {queryParams: {page: event}, queryParamsHandling: 'merge'});
  }
}
