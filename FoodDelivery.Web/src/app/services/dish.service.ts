import { dishParams } from './../models/dish/dishFilter';
import { Guid } from 'guid-typescript';
import { dish } from 'src/app/models/dish/dish';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from './../app.module';
import { Injectable } from '@angular/core';
import { dishCategory } from '../models/dish/dishCategory';

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

  public get(dishFilter?: dishParams): Observable<dish[]>{

    //?????????????????
    const url = this.dishUrl + `?dishFilter=${JSON.stringify(dishFilter)}`;

    return this.http.get<dish[]>(url);
  }

  public getTop(): Observable<dish[]>{
    const url = this.dishUrl + "top";
    return this.http.get<dish[]>(url);
  }

  public addDish(dish: dish){
    const url = this.dishUrl;
    return this.http.post<dish>(url, dish, { withCredentials: true });
  }

  public updateRestaurant(dish: dish){
    const url = this.dishUrl;
    return this.http.put<dish>(url, dish, { withCredentials: true });
  }

  public removeDish(dishId: Guid){
    const url = this.dishUrl + `${dishId}`;
    return this.http.delete<dish>(url, { withCredentials: true });
  }
}
