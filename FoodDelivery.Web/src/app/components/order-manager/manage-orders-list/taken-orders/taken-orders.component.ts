import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from './../../../confirm-dialog/confirm-dialog.component';
import { ModalHelper } from './../../../../helpers/ModalHelper';
import { Guid } from 'guid-typescript';
import { OrderStatus } from './../../../../models/enums/statuses/OrderStatus';
import { OrderService } from './../../../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFilterParams } from './../../../../models/filters/BaseFilterParams';
import { PaginationConfig } from './../../../../models/PaginationConfig';
import { OrderManager } from '../../../../models/order/OrderManager';
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
    this.modalHelper.openOrderItemsEdit(id);
  }

  releaseOrder(id: Guid){
    const modal = this.modalService.open(ConfirmDialogComponent);
    modal.componentInstance.confirmHeader = "Release order";
    modal.componentInstance.confirmMessage = `Are you sure you want to release order?`;

    modal.result.then((result) => {
      if(result == true){
        this.orderService.releaseOrder(id).subscribe(_ => location.reload());
      }
    });
  }

  pageChanged(event){
    this.router.navigate([], {queryParams: {page: event}, queryParamsHandling: 'merge'});
  }
}
