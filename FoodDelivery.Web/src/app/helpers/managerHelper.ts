import { OrderService } from '../services/order.service';
import { ManagerInfo } from '../models/info/ManagerInfo';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ManagerHelper{
    public info: ManagerInfo = new ManagerInfo();

    constructor(private orderService:OrderService){
    }

    getInfo(): Observable<ManagerInfo>{
      var result = this.orderService.getManagerInfo();

      result.subscribe(i => {
        this.info = i;
      });

      return result;
    }
}