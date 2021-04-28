import { RestaurantOrderShortResponse } from './../models/restaurantOrder/RestaurantOrderShortResponse';
import { BaseFilterParams } from './../models/filters/BaseFilterParams';
import { OrderResponse } from './../models/order/OrderResponse';
import { IFileDetails } from './../models/IFileDetails';
import { RateRestaurant } from './../models/restaurant/RateRestaurant';
import { RestaurantList } from './../models/restaurant/RestaurantList';
import { RestaurantAddModel } from './../models/restaurant/RestaurantAddModel';
import { RestaurantUpdateModel } from '../models/restaurant/RestaurantUpdateModel';
import { serverUrl } from './../globals';
import { MyRestaurantFilterParams } from '../models/filters/MyRestaurantFilterParams';
import { RestaurantListResponse } from '../models/restaurant/RestaurantListResponse';
import { RestaurantFilterParams } from '../models/filters/RestaurantFilterParams';
import { RestaurantDetail } from 'src/app/models/restaurant/RestaurantDetail';
import { Guid } from 'guid-typescript';
import { RestaurantAddress } from '../models/restaurant/RestaurantAddress';
import { Observable } from 'rxjs';
import { RestaurantType } from '../models/restaurant/RestaurantType';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rating } from '../models/Rating';
import { RestaurantOrderResponse } from '../models/restaurantOrder/RestaurantOrderResponse';
import { RestaurantOrderShort } from '../models/restaurantOrder/RestaurantOrderShort';
import { RestaurantOrderItem } from '../models/restaurantOrder/RestaurantOrderItem';

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

  public retrieve(restaurantFilterParams:RestaurantFilterParams): Observable<RestaurantListResponse>{
    const url = this.restaurantUrl + "retrieve";
    return this.http.post<RestaurantListResponse>(url, restaurantFilterParams);
  }

  public getAddresses(id: Guid): Observable<RestaurantAddress[]>{
    const url = this.restaurantUrl + `${id}/addresses`;
    return this.http.get<RestaurantAddress[]>(url);
  }

  public getAllNames(): Observable<string[]>{
    const url = this.restaurantUrl + "names";
    return this.http.get<string[]>(url);
  }

  public getNamesByOwner(): Observable<string[]>{
    const url = this.restaurantUrl + "ownernames";
    return this.http.get<string[]>(url, { withCredentials: true });
  }

  public getByName(name: string): Observable<RestaurantDetail>{
    const url = this.restaurantUrl + name;
    return this.http.get<RestaurantDetail>(url, { withCredentials: true });
  }

  public getStatus(name: string):Observable<number>{
    const url = this.restaurantUrl + `${name}/status`;
    return this.http.get<number>(url, { withCredentials: true });
  }

  public getTop(): Observable<RestaurantList[]>{
    const url = this.restaurantUrl + "top";
    return this.http.get<RestaurantList[]>(url);
  }

  public getUpdateRestaurantById(id: string): Observable<RestaurantUpdateModel>{
    const url = this.restaurantUrl + `updaterestaurant/${id}`;
    return this.http.get<RestaurantUpdateModel>(url, { withCredentials: true });
  }

  public addRestaurant(restaurant: RestaurantAddModel){
    const url = this.restaurantUrl + "add";
    return this.http.post(url, restaurant, { withCredentials: true });
  }

  public addAddress(restaurantAddress: RestaurantAddress){
    const url = this.restaurantUrl + "address";
    return this.http.post(url, restaurantAddress, { withCredentials: true });
  }

  public updateRestaurant(restaurant:RestaurantUpdateModel){
    const url = this.restaurantUrl;
    return this.http.put(url, restaurant, { withCredentials: true });
  }

  public removeAddress(restaurantAddressId: Guid){
    const url = this.restaurantUrl + `address/${restaurantAddressId}`;
    return this.http.delete(url, { withCredentials: true });
  }

  public stop(id: Guid){
    const url = this.restaurantUrl + "deactivate";
    return this.http.post(url, JSON.stringify(id), { withCredentials: true, headers: {'Content-Type': 'application/json' } });
  }

  public activate(id: Guid){
    const url = this.restaurantUrl + "activate";
    return this.http.post(url, JSON.stringify(id), { withCredentials: true, headers: {'Content-Type': 'application/json' } });
  }

  public rate(rateRestaurant: RateRestaurant){
    const url = this.restaurantUrl + "rate";
    return this.http.post(url, rateRestaurant, { withCredentials: true });    
  }

  public getRating(id: Guid): Observable<Rating>{
    const url = this.restaurantUrl + `rating/${id}`;
    return this.http.get<Rating>(url, { withCredentials: true });
  }

  public changeImage(image: IFileDetails, id: string){
    const url = this.restaurantUrl + `changeimage/${id}`;
    return this.http.post(url, image, { withCredentials: true });
  }

  public deleteImage(id: string){
    const url = this.restaurantUrl + `deleteimage/${id}`;
    return this.http.delete(url, { withCredentials: true });
  }

  public getImage(id: string): Observable<string>{
    const url = this.restaurantUrl + `image/${id}`;
    const requestOptions: Object = {
      responseType: 'text'
    }

    return this.http.get<string>(url,  requestOptions);
  }
}
