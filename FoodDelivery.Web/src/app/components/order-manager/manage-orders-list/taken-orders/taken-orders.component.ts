import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ManagerHelper } from './../../../../helpers/managerHelper';
import { ManageOrderComponent } from './../manage-order/manage-order.component';
import { OrderFilterParams } from './../../../../models/filters/OrderFilterParams';
import { itemsPerPage } from './../../../../globals';
import { OrderManager } from './../../../../models/order/OrderManager';
import { OrderItemsComponent } from './../order-items/order-items.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from './../../../confirm-dialog/confirm-dialog.component';
import { ModalHelper } from '../../../../helpers/ModalHelper';
import { Guid } from 'guid-typescript';
import { OrderStatus } from './../../../../models/enums/statuses/OrderStatus';
import { OrderService } from './../../../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFilterParams } from './../../../../models/filters/BaseFilterParams';
import { PaginationConfig } from './../../../../models/PaginationConfig';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-taken-orders',
  templateUrl: './taken-orders.component.html',
  styleUrls: ['./taken-orders.component.css']
})
export class TakenOrdersComponent implements OnInit {
  orders$;
  config: PaginationConfig = new PaginationConfig();
  filterParams: OrderFilterParams = new OrderFilterParams();

  statuses = OrderStatus;
  selectedStatus: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService, 
    private modalHelper:ModalHelper,
    private modalService: NgbModal,
    private managerHelper: ManagerHelper) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params.page ? +params.page : 1;
      this.config.itemsPerPage = itemsPerPage;
      this.selectedStatus = params.status ? params.status : "All";

      this.filterParams.search = params.search ? params.search : null;
    });   

    this.filterParams.currentPage = this.config.currentPage;
    this.filterParams.itemsPerPage = this.config.itemsPerPage;
    this.filterParams.status = this.statuses[`${this.selectedStatus}`];

    this.retrieveOrders();

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  showItems(id: Guid){
    this.modalHelper.openOrderItems(id);
  }

  verifyOrder(id: Guid){
    const modal = this.modalService.open(OrderItemsComponent);
    modal.componentInstance.orderId = id;
    modal.componentInstance.header = "Verify order";
    modal.componentInstance.enableEditing = true;

    modal.result.then((result) => {
      this.retrieveOrders();                
    }, (reason) => {
      this.retrieveOrders();
    });
  }

  manageOrder(id: Guid){
    const modal = this.modalService.open(ManageOrderComponent);
    modal.componentInstance.orderId = id;

    modal.result.then((result) => {
      this.retrieveOrders();
    }, reason => {
      this.retrieveOrders();
    });
  }

  releaseOrder(id: Guid){
    const modal = this.modalService.open(ConfirmDialogComponent);
    modal.componentInstance.confirmHeader = "Release order";
    modal.componentInstance.confirmMessage = `Are you sure you want to release order?`;

    modal.result.then((result) => {
      if(result == true){
        this.orderService.releaseOrder(id).subscribe(_ => {
          this.retrieveOrders();
        });
      }
    });
  }

  startDelivery(id: Guid){
    this.orderService.startDelivery(id).subscribe(_ => {
      this.retrieveOrders();
    });
  }

  deliveryCompleted(order: OrderManager){
    this.orderService.deliveryCompleted(order).subscribe(_ => {
      this.retrieveOrders();
    });
  }

  pageChanged(event){
    this.router.navigate([], {queryParams: {page: event}, queryParamsHandling: 'merge'});
  }

  private retrieveOrders(){
    this.orders$ = Observable.interval(5000).startWith(0).mergeMap(_ => 
      this.orderService.retrieveTaken(this.filterParams)
      .pipe(map(o => 
        {
          this.config.totalItems = o.totalOrdersCount;
          this.managerHelper.getInfo().subscribe();
          return o.orders;
        })
      )
    );
  }
}
