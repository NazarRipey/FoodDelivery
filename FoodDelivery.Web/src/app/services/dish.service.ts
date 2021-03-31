import { dishDetailObject } from './../models/dish/dishDetailObject';
import { dishObject } from '../models/dish/dishObject';
import { dishFilterParams } from './../models/filters/dishFilterParams';
import { dishListResponse } from './../models/dish/dishListResponse';
import { baseFilterParams } from '../models/filters/baseFilterParams';
import { Guid } from 'guid-typescript';
import { dishListObject } from 'src/app/models/dish/dishListObject';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from './../app.module';
import { Injectable } from '@angular/core';
import { dishCategory } from '../models/dish/dishCategory';
import { dishCartObject } from '../models/dish/dishCartObject';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  dishUrl = serverUrl + "api/dish/";

  constructor(private http:HttpClient) { }

  public getCategories(): Observable<dishCategory[]>{
    const url = this.dishUrl + "categories";
    return this.http.get<dishCategory[]>(url);
  }

  public getTop(): Observable<dishListObject[]>{
    const url = this.dishUrl + "top";
    return this.http.get<dishListObject[]>(url);
  }

  public getCartDishById(id: Guid): Observable<dishCartObject>{
    const url = this.dishUrl + `cartdish/${id}`;
    return this.http.get<dishCartObject>(url);
  }

  public getDetailDishById(id: string): Observable<dishDetailObject>{
    const url = this.dishUrl + `detail/${id}`;
    return this.http.get<dishDetailObject>(url);
  }

  public retrieve(dishFilterParams: dishFilterParams): Observable<dishListResponse>{
    const url = this.dishUrl + "retrieve";
    return this.http.post<dishListResponse>(url, dishFilterParams);
  }

  public addDish(dish: dishObject){
    const url = this.dishUrl;
    return this.http.post<dishObject>(url, dish, { withCredentials: true });
  }

  public updateRestaurant(dish: dishObject){
    const url = this.dishUrl;
    return this.http.put<dishListObject>(url, dish, { withCredentials: true });
  }

  public removeDish(dishId: Guid){
    const url = this.dishUrl + `${dishId}`;
    return this.http.delete<dishListObject>(url, { withCredentials: true });
  }

  public stop(id: Guid){
    const url = this.dishUrl + "deactivate";
    return this.http.post(url, JSON.stringify(id), { withCredentials: true, headers: {'Content-Type': 'application/json' } });
  }

  public activate(id: Guid){
    const url = this.dishUrl + "activate";
    return this.http.post(url, JSON.stringify(id), { withCredentials: true, headers: {'Content-Type': 'application/json' } });
  }
}
