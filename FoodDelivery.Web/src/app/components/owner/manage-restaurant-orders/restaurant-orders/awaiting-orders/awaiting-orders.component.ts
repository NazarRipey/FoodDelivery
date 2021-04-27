import { OwnerHelper } from './../../../../../helpers/ownerHelper';
import { RestaurantStatus } from './../../../../../models/enums/statuses/RestaurantStatus';
import { OrderStatus } from './../../../../../models/enums/statuses/OrderStatus';
import { RestaurantOrderService } from './../../../../../services/restaurant-order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { RestaurantService } from './../../../../../services/restaurant.service';
import { map } from 'rxjs/operators';
import { itemsPerPage } from './../../../../../globals';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFilterParams } from './../../../../../models/filters/BaseFilterParams';
import { PaginationConfig } from 'src/app/models/PaginationConfig';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StartCookingOrderComponent } from '../start-cooking-order/start-cooking-order.component';

@Component({
  selector: 'app-awaiting-orders',
  templateUrl: './awaiting-orders.component.html',
  styleUrls: ['./awaiting-orders.component.css']
})
export class AwaitingOrdersComponent implements OnInit {

  config: PaginationConfig = new PaginationConfig();
  filterParams: BaseFilterParams = new BaseFilterParams();

  restaurantName: string;
  restaurantStatus: number;

  orderStatuses = OrderStatus;
  restaurantStatuses = RestaurantStatus;

  orders$;

  constructor(private route: ActivatedRoute,
    private router:Router,
    private restaurantOrderService: RestaurantOrderService,
    private restaurantService: RestaurantService,
    private modalService: NgbModal,
    private ownerHelper: OwnerHelper) { }

  ngOnInit(): void {
    this.restaurantName = this.route.parent.snapshot.paramMap.get('name');

    this.restaurantService.getStatus(this.restaurantName).subscribe(st => {
      this.restaurantStatus = st;
      if(this.restaurantStatus == this.restaurantStatuses.Active){
        this.route.queryParams.subscribe(params => {
          this.config.currentPage = params.page ? +params.page : 1;
          this.config.itemsPerPage = itemsPerPage;
    
          this.filterParams.search = params.search ? params.search : null;
        });    
    
        this.filterParams.currentPage = this.config.currentPage;
        this.filterParams.itemsPerPage = this.config.itemsPerPage;
    
        this.retrieveOrders();
    
        this.router.routeReuseStrategy.shouldReuseRoute = function() {
          return false;
        };
      }
    })
  }

  pageChanged(event){
    this.router.navigate([], { queryParams: {page: event}, queryParamsHandling: 'merge' });
  }

  startCooking(id: Guid){
    const modal = this.modalService.open(StartCookingOrderComponent);
    modal.componentInstance.restaurantOrderId = id;

    modal.result.then((result) => {
      this.retrieveOrders();
    }, reason => {
      this.retrieveOrders();
    });
  }

  private retrieveOrders(){
    this.orders$ = Observable.interval(3000).startWith(0).mergeMap(_ => 
      this.restaurantOrderService.retrieveAwaitingOrders(this.restaurantName, this.filterParams)
      .pipe(map(o => 
        {
          this.config.totalItems = o.totalOrdersCount;
          this.ownerHelper.getInfo();
          return o.orders;
        })
      )
    );
  }
}
