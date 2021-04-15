import { OrderManager } from './../../../../models/order/OrderManager';
import { OrderItemsComponent } from './../order-items/order-items.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from './../../../confirm-dialog/confirm-dialog.component';
import { ModalHelper } from './../../../../helpers/ModalHelper';
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
  orders: OrderManager[] = [];
  config: PaginationConfig = new PaginationConfig();
  filterParams: BaseFilterParams = new BaseFilterParams();

  statuses = OrderStatus;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService, 
    private modalHelper:ModalHelper,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params.page ? +params.page : 1;
      this.config.itemsPerPage = 18;

      this.filterParams.search = params.search ? params.search : null;
    });    

    this.filterParams.currentPage = this.config.currentPage;
    this.filterParams.itemsPerPage = this.config.itemsPerPage;

    this.orderService.retrieveTaken(this.filterParams).subscribe(o => {
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

  verifyOrder(i: number){
    const modal = this.modalService.open(OrderItemsComponent);
    modal.componentInstance.orderId = this.orders[i].id;
    modal.componentInstance.header = "Verify order";
    modal.componentInstance.enableEditing = true;

    modal.result.then((result) => {
      this.orderService.getOrderManagerById(this.orders[i].id.toString()).subscribe(o => {
        this.orders[i] = o;
      });                
    }, (reason) => {
      this.orderService.getOrderManagerById(this.orders[i].id.toString()).subscribe(o => {
        this.orders[i] = o;
      }); 
    });
  }

  releaseOrder(i: number){
    const modal = this.modalService.open(ConfirmDialogComponent);
    modal.componentInstance.confirmHeader = "Release order";
    modal.componentInstance.confirmMessage = `Are you sure you want to release order?`;

    modal.result.then((result) => {
      if(result == true){
        this.orderService.releaseOrder(this.orders[i].id).subscribe(_ => {
          this.orders.splice(i, 1);
        });
      }
    });
  }

  pageChanged(event){
    this.router.navigate([], {queryParams: {page: event}, queryParamsHandling: 'merge'});
  }
}
