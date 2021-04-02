import { orderShort } from './../models/order/orderShort';
import { Observable } from 'rxjs';
import { orderFilterParams } from './../models/filters/orderFilterParams';
import { addOrderObject } from './../models/order/addOrderObject';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from './../globals';
import { Injectable } from '@angular/core';
import { orderResponse } from '../models/order/orderResponse';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderUrl = serverUrl + "api/order/";

  constructor(private http:HttpClient) { }

  public getActive(): Observable<orderShort[]>{
    const url = this.orderUrl + "active";
    return this.http.get<orderShort[]>(url, { withCredentials: true });
  }

  public retrieveAll(orderFilterParams: orderFilterParams): Observable<orderResponse>{
    const url = this.orderUrl + "all";
    return this.http.post<orderResponse>(url, orderFilterParams, { withCredentials: true });
  }

  public addOrder(addOrder: addOrderObject){
    const url = this.orderUrl + "add";
    return this.http.post(url, addOrder, { withCredentials: true });
  }
}
