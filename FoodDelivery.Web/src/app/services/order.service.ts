import { BaseFilterParams } from './../models/filters/BaseFilterParams';
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
import { AvailableOrderResponse } from '../models/order/AvailableOrderResponse';
import { OrderManagerResponse } from '../models/order/OrderManagerResponse';
import { OrderItem } from '../models/order/OrderItem';
import { OrderManager } from '../models/order/OrderManager';

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

  public getOrderManagerById(id: string): Observable<OrderManager>{
    const url = this.orderUrl + `managerorder/${id}`;
    return this.http.get<OrderManager>(url, { withCredentials: true });
  }

  public getOrderItem(id: string): Observable<OrderItem>{
    const url = this.orderUrl + `item/${id}`;
    return this.http.get<OrderItem>(url, { withCredentials: true });    
  }

  public getOrderItems(id: string): Observable<OrderItem[]>{
    const url = this.orderUrl + `items/${id}`;
    return this.http.get<OrderItem[]>(url, { withCredentials: true });
  }

  public retrieveHistory(orderFilterParams: OrderFilterParams): Observable<OrderResponse>{
    const url = this.orderUrl + "history";
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

  public retrieveAvailable(filterPrams: BaseFilterParams):Observable<AvailableOrderResponse>{
    const url = this.orderUrl + "available";
    return this.http.post<AvailableOrderResponse>(url, filterPrams, { withCredentials: true });
  }

  public retrieveTaken(filterParams: BaseFilterParams):Observable<OrderManagerResponse>{
    const url = this.orderUrl + "taken";
    return this.http.post<OrderManagerResponse>(url, filterParams, { withCredentials: true });
  }

  public retrieveHistoryByManager(filterParams: BaseFilterParams): Observable<OrderManagerResponse>{
    const url = this.orderUrl + "managerhistory";
    return this.http.post<OrderManagerResponse>(url, filterParams, { withCredentials: true });
  }

  public takeOrder(orderId: Guid){
    const url = this.orderUrl + "take";
    return this.http.post(url, JSON.stringify(orderId), { withCredentials: true,  headers: {'Content-Type': 'application/json' } });
  }

  public releaseOrder(orderId: Guid){
    const url = this.orderUrl + "release";
    return this.http.post(url, JSON.stringify(orderId), { withCredentials: true,  headers: {'Content-Type': 'application/json' } });
  }

  public updateItem(id: Guid, quantity: number){
    const url = this.orderUrl + `item/${id}`;
    return this.http.put(url, JSON.stringify(quantity), { withCredentials: true, headers: {'Content-Type': 'application/json' } });
  }

  public deleteItem(id: Guid){
    const url = this.orderUrl + `item/${id}`;
    return this.http.delete(url, { withCredentials: true });
  }
}
