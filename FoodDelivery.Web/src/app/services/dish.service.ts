import { IFileDetails } from 'src/app/models/IFileDetails';
import { RateDish } from './../models/dish/RateDish';
import { DishDetailResponse } from './../models/dish/DishDetailResponse';
import { DishRestaurantFilterParams } from './../models/filters/DishRestaurantFilterParams';
import { DishUpdateModel } from '../models/dish/DishUpdateModel';
import { DishDetail } from '../models/dish/DishDetail';
import { DishAddModel } from '../models/dish/DishAddModel';
import { DishFilterParams } from '../models/filters/DishFilterParams';
import { DishListResponse } from '../models/dish/DishListResponse';
import { BaseFilterParams } from '../models/filters/BaseFilterParams';
import { Guid } from 'guid-typescript';
import { DishList } from 'src/app/models/dish/DishList';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from './../globals';
import { Injectable } from '@angular/core';
import { DishCategory } from '../models/dish/DishCategory';
import { DishCart } from '../models/dish/DishCart';
import { DishRestaurantListResponse } from '../models/dish/DishRestaurantListResponse';
import { Rating } from '../models/Rating';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  dishUrl = serverUrl + "api/dish/";

  constructor(private http:HttpClient) { }

  public getCategories(): Observable<DishCategory[]>{
    const url = this.dishUrl + "categories";
    return this.http.get<DishCategory[]>(url);
  }

  public getTop(): Observable<DishList[]>{
    const url = this.dishUrl + "top";
    return this.http.get<DishList[]>(url);
  }

  public getCartDishById(id: Guid): Observable<DishCart>{
    const url = this.dishUrl + `cartdish/${id}`;
    return this.http.get<DishCart>(url, { withCredentials: true });
  }

  public getDetailDishById(id: string): Observable<DishDetail>{
    const url = this.dishUrl + `detail/${id}`;
    return this.http.get<DishDetail>(url, { withCredentials: true });
  }

  public getUpdateDishById(id: string): Observable<DishUpdateModel>{
    const url = this.dishUrl + `updatedish/${id}`;
    return this.http.get<DishUpdateModel>(url, { withCredentials: true });
  }

  public retrieve(dishFilterParams: DishFilterParams): Observable<DishListResponse>{
    const url = this.dishUrl + "retrieve";
    return this.http.post<DishListResponse>(url, dishFilterParams);
  }

  public retrieveByRestaurant(filterParams: DishRestaurantFilterParams): Observable<DishRestaurantListResponse>{
    const url = this.dishUrl + "retrievebyrestaurant";
    return this.http.post<DishRestaurantListResponse>(url, filterParams, { withCredentials:true });
  }

  public retrieveDetailByRestaurant(filterParams: DishRestaurantFilterParams): Observable<DishDetailResponse>{
    const url = this.dishUrl + "retrievedetailbyrestaurant";
    return this.http.post<DishDetailResponse>(url, filterParams);
  }

  public addDish(dish: DishAddModel){
    const url = this.dishUrl;
    return this.http.post<DishAddModel>(url, dish, { withCredentials: true });
  }

  public updateDish(dish: DishUpdateModel){
    const url = this.dishUrl;
    return this.http.put(url, dish, { withCredentials: true });
  }

  public removeDish(dishId: Guid){
    const url = this.dishUrl + `${dishId}`;
    return this.http.delete(url, { withCredentials: true });
  }

  public stop(id: Guid){
    const url = this.dishUrl + "deactivate";
    return this.http.post(url, JSON.stringify(id), { withCredentials: true, headers: {'Content-Type': 'application/json' } });
  }

  public activate(id: Guid){
    const url = this.dishUrl + "activate";
    return this.http.post(url, JSON.stringify(id), { withCredentials: true, headers: {'Content-Type': 'application/json' } });
  }

  public rate(rateDish: RateDish){
    const url = this.dishUrl + "rate";
    return this.http.post(url, rateDish, { withCredentials: true });    
  }

  public getRating(id: Guid): Observable<Rating>{
    const url = this.dishUrl + `rating/${id}`;
    return this.http.get<Rating>(url, { withCredentials: true });
  }

  public changeImage(image: IFileDetails, id: string){
    const url = this.dishUrl + `changeimage/${id}`;
    return this.http.post(url, image, { withCredentials: true });
  }

  public deleteImage(id: string){
    const url = this.dishUrl + `deleteimage/${id}`;
    return this.http.delete(url, { withCredentials: true });
  }

  public getImage(id: string): Observable<string>{
    const url = this.dishUrl + `image/${id}`;
    const requestOptions: Object = {
      responseType: 'text'
    }

    return this.http.get<string>(url,  requestOptions);
  }
}
