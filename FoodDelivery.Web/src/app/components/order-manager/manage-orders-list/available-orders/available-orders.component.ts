import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ModalHelper } from './../../../../helpers/ModalHelper';
import { Guid } from 'guid-typescript';
import { OrderService } from './../../../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFilterParams } from './../../../../models/filters/BaseFilterParams';
import { PaginationConfig } from './../../../../models/PaginationConfig';
import { Component, OnInit } from '@angular/core';
import { AvailableOrder } from 'src/app/models/order/AvailableOrder';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-available-orders',
  templateUrl: './available-orders.component.html',
  styleUrls: ['./available-orders.component.css']
})
export class AvailableOrdersComponent implements OnInit {
  orders: AvailableOrder[] = [];
  config: PaginationConfig = new PaginationConfig();
  filterParams: BaseFilterParams = new BaseFilterParams();

  orders$;

  constructor(private route: ActivatedRoute,
    private router:Router,
    private orderService:OrderService,
    private modalHelper: ModalHelper) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params.page ? +params.page : 1;
      this.config.itemsPerPage = 1;

      this.filterParams.search = params.search ? params.search : null;
    });    

    this.filterParams.currentPage = this.config.currentPage;
    this.filterParams.itemsPerPage = this.config.itemsPerPage;

    this.orders$ = Observable.interval(3000).startWith(0).mergeMap(_ => 
      this.orderService.retrieveAvailable(this.filterParams)
      .pipe(map(o => 
        {
          this.config.totalItems = o.totalOrdersCount;
          return o.orders;
        })
      )
    );

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };


  }
  
  showItems(id: Guid){
    this.modalHelper.openOrderItems(id);
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
