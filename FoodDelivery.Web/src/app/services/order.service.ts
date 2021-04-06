import { Guid } from 'guid-typescript';
import { OrderShort } from '../models/order/OrderShort';
import { Observable } from 'rxjs';
import { OrderFilterParams } from '../models/filters/OrderFilterParams';
import { AddOrderModel } from '../models/order/AddOrderModel';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from './../globals';
import { Injectable } from '@angular/core';
import { OrderResponse } from '../models/order/OrderResponse';
import { OrderDetail } from '../models/order/OrderDetail';
import { UpdateOrderModel } from '../models/order/UpdateOrderModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderUrl = serverUrl + "api/order/";

  constructor(private http:HttpClient) { }

  public getActive(): Observable<OrderShort[]>{
    const url = this.orderUrl + "active";
    return this.http.get<OrderShort[]>(url, { withCredentials: true });
  }

  public getDetailOrderById(id: string): Observable<OrderDetail>{
    const url = this.orderUrl + `${id}`;
    return this.http.get<OrderDetail>(url, { withCredentials: true });
  }

  public getUpdateOrderById(id: string): Observable<UpdateOrderModel>{
    const url = this.orderUrl + `updateorder/${id}`;
    return this.http.get<UpdateOrderModel>(url, { withCredentials: true });
  }

  public retrieveAll(orderFilterParams: OrderFilterParams): Observable<OrderResponse>{
    const url = this.orderUrl + "all";
    return this.http.post<OrderResponse>(url, orderFilterParams, { withCredentials: true });
  }

  public addOrder(addOrder: AddOrderModel){
    const url = this.orderUrl + "add";
    return this.http.post(url, addOrder, { withCredentials: true });
  }

  public updateOrder(updateOrder: UpdateOrderModel){
    const url = this.orderUrl;
    return this.http.put(url, updateOrder, { withCredentials:true });
  }

  public cancelOrder(id: Guid){
    const url = this.orderUrl + "cancel";
    return this.http.post(url, JSON.stringify(id), { withCredentials: true,  headers: {'Content-Type': 'application/json' } });
  }
}
