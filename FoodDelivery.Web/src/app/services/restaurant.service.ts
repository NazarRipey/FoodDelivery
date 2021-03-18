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

  public addRestaurant(restaurant: Restaurant){
    const url = this.restaurantUrl + "add";
    return this.http.post<Restaurant>(url, restaurant, { withCredentials: true });
  }

  public getTypes(): Observable<RestaurantType[]>{
    const url = this.restaurantUrl + "types";
    return this.http.get<RestaurantType[]>(url);
  }

  public getMyRestaurants(): Observable<Restaurant[]>{
    const url = this.restaurantUrl + "myrestaurants";
    return this.http.get<Restaurant[]>(url, { withCredentials: true });
  }
}
