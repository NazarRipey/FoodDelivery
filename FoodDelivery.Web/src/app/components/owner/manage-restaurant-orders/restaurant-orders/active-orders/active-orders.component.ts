import { RestaurantStatus } from './../../../../../models/enums/statuses/RestaurantStatus';
import { ManageRestaurantOrderComponent } from './../manage-restaurant-order/manage-restaurant-order.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantOrderShort } from './../../../../../models/restaurantOrder/RestaurantOrderShort';
import { Guid } from 'guid-typescript';
import { RestaurantOrderService } from './../../../../../services/restaurant-order.service';
import { OrderStatus } from './../../../../../models/enums/statuses/OrderStatus';
import { BaseFilterParams } from './../../../../../models/filters/BaseFilterParams';
import { RestaurantOrder } from 'src/app/models/restaurantOrder/RestaurantOrder';
import { itemsPerPage } from './../../../../../globals';
import { PaginationConfig } from 'src/app/models/PaginationConfig';
import { RestaurantService } from './../../../../../services/restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.css']
})
export class ActiveOrdersComponent implements OnInit {
  restaurantName: string;
  restaurantStatus: number;
  orderStatuses = OrderStatus;
  filterParams: BaseFilterParams = new BaseFilterParams();
  config: PaginationConfig = new PaginationConfig();

  orders: RestaurantOrderShort[] = [];
  restaurantStatuses = RestaurantStatus;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private restaurantOrderService:RestaurantOrderService,
    private restaurantService: RestaurantService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.restaurantName = this.route.parent.snapshot.paramMap.get('name');

    this.restaurantService.getStatus(this.restaurantName).subscribe(s => {
      this.restaurantStatus = s;
      if(this.restaurantStatus == this.restaurantStatuses.Active){
        this.route.queryParams.subscribe(params => {
          this.config.currentPage = params.page ? +params.page : 1;
          this.config.itemsPerPage = itemsPerPage;
          this.filterParams.search = params.search ? params.search : null;
        });
    
        this.filterParams.itemsPerPage = this.config.itemsPerPage;
        this.filterParams.currentPage = this.config.currentPage;
    
        this.retrieveOrders();
      }
    })
  }

  manage(id: Guid){
    const modal = this.modalService.open(ManageRestaurantOrderComponent);
    modal.componentInstance.restaurantOrderId = id;

    modal.result.then((result) => {
      this.retrieveOrders();
    }, reason => {
      this.retrieveOrders();
    });
  }

  private retrieveOrders(){
    this.restaurantOrderService.retrieveCookingOrders(this.restaurantName, this.filterParams).subscribe(o => {
      this.config.totalItems = o.totalOrdersCount;
      this.orders = o.orders;
    })
  }

  pageChanged(event){
    this.router.navigate([], { queryParams: {page: event}, queryParamsHandling: 'merge' });
  }
}
