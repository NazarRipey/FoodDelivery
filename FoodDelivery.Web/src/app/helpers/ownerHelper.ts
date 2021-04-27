import { Observable } from 'rxjs';
import { OrderService } from './../services/order.service';
import { OwnerInfo } from './../models/info/OwnerInfo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OwnerHelper{
  public info: OwnerInfo = new OwnerInfo();

  constructor(private orderService:OrderService){
  }

  getInfo(): Observable<OwnerInfo>{
    var result = this.orderService.getOwnerInfo();

    result.subscribe(i => {
      this.info = i;
    });

    return result;
  }
}