import { RestaurantOrderShortResponse } from './../models/restaurantOrder/RestaurantOrderShortResponse';
import { BaseFilterParams } from './../models/filters/BaseFilterParams';
import { RestaurantOrderItem } from './../models/restaurantOrder/RestaurantOrderItem';
import { Guid } from 'guid-typescript';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from './../globals';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestaurantOrder } from '../models/restaurantOrder/RestaurantOrder';

@Injectable({
  providedIn: 'root'
})
export class RestaurantOrderService {
  restaurantOrderUrl = serverUrl + "api/restaurantOrder/";

  constructor(private http: HttpClient) { }

  public getRestaurantOrderItems(restaurantId: Guid): Observable<RestaurantOrderItem[]>{
    const url = this.restaurantOrderUrl + `${restaurantId}/items`;
    return this.http.get<RestaurantOrderItem[]>(url, { withCredentials: true });
  }

  public retrieveAwaitingOrders(name: string, filterParams: BaseFilterParams): Observable<RestaurantOrderShortResponse>{
    const url = this.restaurantOrderUrl + `${name}/orders/awaiting`;
    return this.http.post<RestaurantOrderShortResponse>(url, filterParams, { withCredentials:true });
  }

  public retrieveCookingOrders(name: string, filterParams: BaseFilterParams): Observable<RestaurantOrderShortResponse>{
    const url = this.restaurantOrderUrl + `${name}/orders/cooking`;
    return this.http.post<RestaurantOrderShortResponse>(url, filterParams, { withCredentials:true });
  }

  public retrieveOrdersHistory(name: string, filterParams: BaseFilterParams): Observable<RestaurantOrderShortResponse>{
    const url = this.restaurantOrderUrl + `${name}/orders/history`;
    return this.http.post<RestaurantOrderShortResponse>(url, filterParams, { withCredentials:true });
  }

  public requestQuantityChange(items: RestaurantOrderItem[]){
    const url = this.restaurantOrderUrl + "requestquantitychange";
    return this.http.post(url, items, { withCredentials:true });
  }

  public approveQuantityRequestItem(item: RestaurantOrderItem){
    const url = this.restaurantOrderUrl + "approvequantityrequest";
    return this.http.post(url, item, { withCredentials: true });
  }

  public declineQuantityRequestItem(item: RestaurantOrderItem){
    const url = this.restaurantOrderUrl + "declinequantityrequest";
    return this.http.post(url, item, { withCredentials: true });
  }

  cancelRestaurantOrder(id: Guid) {
    const url = this.restaurantOrderUrl + `cancel/${id}`;
    return this.http.delete(url, { withCredentials: true });
  }

  public startCooking(restaurantOrderId: Guid){
    const url = this.restaurantOrderUrl + "startcooking";
    return this.http.post(url, JSON.stringify(restaurantOrderId), 
      { withCredentials: true, headers: {'Content-Type': 'application/json' } });
  }

  public makeReady(item: RestaurantOrderItem){
    const url = this.restaurantOrderUrl + "makeready";
    return this.http.post(url, item, { withCredentials:true });
  }
}
