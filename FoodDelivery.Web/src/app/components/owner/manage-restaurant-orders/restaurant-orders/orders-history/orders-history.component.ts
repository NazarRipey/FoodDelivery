import { RestaurantOrderService } from './../../../../../services/restaurant-order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { itemsPerPage } from './../../../../../globals';
import { RestaurantOrderShort } from './../../../../../models/restaurantOrder/RestaurantOrderShort';
import { PaginationConfig } from './../../../../../models/PaginationConfig';
import { BaseFilterParams } from './../../../../../models/filters/BaseFilterParams';
import { OrderStatus } from './../../../../../models/enums/statuses/OrderStatus';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css']
})
export class OrdersHistoryComponent implements OnInit {
  restaurantName: string;
  orderStatuses = OrderStatus;
  filterParams: BaseFilterParams = new BaseFilterParams();
  config: PaginationConfig = new PaginationConfig();

  orders: RestaurantOrderShort[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private restaurantOrderService:RestaurantOrderService) { }

  ngOnInit(): void {
    this.restaurantName = this.route.parent.snapshot.paramMap.get('name');

    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params.page ? +params.page : 1;
      this.config.itemsPerPage = itemsPerPage;
      this.filterParams.search = params.search ? params.search : null;
    });

    this.filterParams.itemsPerPage = this.config.itemsPerPage;
    this.filterParams.currentPage = this.config.currentPage;

    this.restaurantOrderService.retrieveOrdersHistory(this.restaurantName, this.filterParams).subscribe(o => {
      this.config.totalItems = o.totalOrdersCount;
      this.orders = o.orders;
    })
  }

  pageChanged(event){
    this.router.navigate([], { queryParams: {page: event}, queryParamsHandling: 'merge' });
  }
}
