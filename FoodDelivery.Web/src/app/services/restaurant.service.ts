import { Guid } from 'guid-typescript';
import { restaurantAddress } from './../models/restaurant/restaurantAddress';
import { Observable } from 'rxjs';
import { RestaurantType } from './../models/restaurant/restaurantType';
import { serverUrl } from './../app.module';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  restaurantUrl = serverUrl + "api/restaurant/";

  constructor(private http: HttpClient) { }

  public getTypes(): Observable<RestaurantType[]>{
    const url = this.restaurantUrl + "types";
    return this.http.get<RestaurantType[]>(url);
  }

  public getAll(): Observable<Restaurant[]>{
    const url = this.restaurantUrl;
    return this.http.get<Restaurant[]>(url);
  }

  public getByName(name: string): Observable<Restaurant>{
    const url = this.restaurantUrl + name;
    return this.http.get<Restaurant>(url);
  }

  public getTop(): Observable<Restaurant[]>{
    const url = this.restaurantUrl + "top";
    return this.http.get<Restaurant[]>(url);
  }

  public getMyRestaurants(): Observable<Restaurant[]>{
    const url = this.restaurantUrl + "myrestaurants";
    return this.http.get<Restaurant[]>(url, { withCredentials: true });
  }

  public addRestaurant(restaurant: Restaurant){
    const url = this.restaurantUrl + "add";
    return this.http.post<Restaurant>(url, restaurant, { withCredentials: true });
  }

  public addAddress(restaurantAddress: restaurantAddress){
    const url = this.restaurantUrl + "address";
    return this.http.post<Restaurant>(url, restaurantAddress, { withCredentials: true });
  }

  public updateRestaurant(restaurant:Restaurant){
    const url = this.restaurantUrl;
    return this.http.put<Restaurant>(url, restaurant);
  }

  public removeAddress(restaurantAddressId: Guid){
    const url = this.restaurantUrl + `address/${restaurantAddressId}`;
    return this.http.delete<Restaurant>(url, { withCredentials: true });
  }

  public removeRestaurant(restaurantId: Guid){
    const url = this.restaurantUrl + `${restaurantId}`;
    return this.http.delete<Restaurant>(url, { withCredentials: true });
  }
}
