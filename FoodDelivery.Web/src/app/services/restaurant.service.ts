import { restaurantDetailResponse } from './../models/restaurant/restaurantDetailResponse';
import { myRestaurantFilterParams } from './../models/filters/myRestaurantFilterParams';
import { restaurantListResponse } from './../models/restaurant/restaurantListResponse';
import { restaurantFilterParams } from './../models/filters/restaurantFilterParams';
import { restaurantDetailObject } from 'src/app/models/restaurant/restaurantDetailObject';
import { Guid } from 'guid-typescript';
import { restaurantAddress } from './../models/restaurant/restaurantAddress';
import { Observable } from 'rxjs';
import { restaurantType } from './../models/restaurant/restaurantType';
import { serverUrl } from './../app.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  restaurantUrl = serverUrl + "api/restaurant/";

  constructor(private http: HttpClient) { }

  public getTypes(): Observable<restaurantType[]>{
    const url = this.restaurantUrl + "types";
    return this.http.get<restaurantType[]>(url);
  }

  public retrieve(restaurantFilterParams:restaurantFilterParams): Observable<restaurantListResponse>{
    const url = this.restaurantUrl + "retrieve";
    return this.http.post<restaurantListResponse>(url, restaurantFilterParams);
  }

  public getAllNames(): Observable<string[]>{
    const url = this.restaurantUrl + "names";
    return this.http.get<string[]>(url);
  }

  public getByName(name: string): Observable<restaurantDetailObject>{
    const url = this.restaurantUrl + name;
    return this.http.get<restaurantDetailObject>(url);
  }

  public getTop(): Observable<restaurantDetailObject[]>{
    const url = this.restaurantUrl + "top";
    return this.http.get<restaurantDetailObject[]>(url);
  }

  public retrieveMyRestaurants(filterParams: myRestaurantFilterParams): Observable<restaurantDetailResponse>{
    const url = this.restaurantUrl + "myrestaurants";
    return this.http.post<restaurantDetailResponse>(url, filterParams, { withCredentials: true });
  }

  public addRestaurant(restaurant: restaurantDetailObject){
    const url = this.restaurantUrl + "add";
    return this.http.post<restaurantDetailObject>(url, restaurant, { withCredentials: true });
  }

  public addAddress(restaurantAddress: restaurantAddress){
    const url = this.restaurantUrl + "address";
    return this.http.post<restaurantDetailObject>(url, restaurantAddress, { withCredentials: true });
  }

  public updateRestaurant(restaurant:restaurantDetailObject){
    const url = this.restaurantUrl;
    return this.http.put<restaurantDetailObject>(url, restaurant, { withCredentials: true });
  }

  public removeAddress(restaurantAddressId: Guid){
    const url = this.restaurantUrl + `address/${restaurantAddressId}`;
    return this.http.delete<restaurantDetailObject>(url, { withCredentials: true });
  }

  public removeRestaurant(restaurantId: Guid){
    const url = this.restaurantUrl + `${restaurantId}`;
    return this.http.delete<restaurantDetailObject>(url, { withCredentials: true });
  }

  public stop(id: Guid){
    const url = this.restaurantUrl + "deactivate";
    return this.http.post(url, JSON.stringify(id), { withCredentials: true, headers: {'Content-Type': 'application/json' } });
  }

  public activate(id: Guid){
    const url = this.restaurantUrl + "activate";
    return this.http.post(url, JSON.stringify(id), { withCredentials: true, headers: {'Content-Type': 'application/json' } });
  }
}
