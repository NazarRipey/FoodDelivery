import { restaurant } from 'src/app/models/restaurant/restaurant';
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

  public getAll(): Observable<restaurant[]>{
    const url = this.restaurantUrl;
    return this.http.get<restaurant[]>(url);
  }

  public getAllNames(): Observable<string[]>{
    const url = this.restaurantUrl + "names";
    return this.http.get<string[]>(url);
  }

  public getByName(name: string): Observable<restaurant>{
    const url = this.restaurantUrl + name;
    return this.http.get<restaurant>(url);
  }

  public getTop(): Observable<restaurant[]>{
    const url = this.restaurantUrl + "top";
    return this.http.get<restaurant[]>(url);
  }

  public getNameById(id: Guid){
    const url = this.restaurantUrl + `getname/${id}`;
    return this.http.get(url, {responseType: 'text'});
  }

  public getMyRestaurants(): Observable<restaurant[]>{
    const url = this.restaurantUrl + "myrestaurants";
    return this.http.get<restaurant[]>(url, { withCredentials: true });
  }

  public addRestaurant(restaurant: restaurant){
    const url = this.restaurantUrl + "add";
    return this.http.post<restaurant>(url, restaurant, { withCredentials: true });
  }

  public addAddress(restaurantAddress: restaurantAddress){
    const url = this.restaurantUrl + "address";
    return this.http.post<restaurant>(url, restaurantAddress, { withCredentials: true });
  }

  public updateRestaurant(restaurant:restaurant){
    const url = this.restaurantUrl;
    return this.http.put<restaurant>(url, restaurant, { withCredentials: true });
  }

  public removeAddress(restaurantAddressId: Guid){
    const url = this.restaurantUrl + `address/${restaurantAddressId}`;
    return this.http.delete<restaurant>(url, { withCredentials: true });
  }

  public removeRestaurant(restaurantId: Guid){
    const url = this.restaurantUrl + `${restaurantId}`;
    return this.http.delete<restaurant>(url, { withCredentials: true });
  }
}
