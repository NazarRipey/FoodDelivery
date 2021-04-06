
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { RestaurantRequestFilterParams } from '../models/filters/RestaurantRequestFilterParams';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from './../globals';
import { Injectable } from '@angular/core';
import { RestaurantRequestResponse } from '../models/restaurantRequest/RestaurantRequestResponse';

@Injectable({
  providedIn: 'root'
})
export class RestaurantRequestService {

  requestUrl = serverUrl + "api/restaurantrequest/"

  constructor(private http: HttpClient) { }

  retrieve(filterParams: RestaurantRequestFilterParams): Observable<RestaurantRequestResponse>
  {
    const url = this.requestUrl + "retrieve";
    return this.http.post<RestaurantRequestResponse>(url, filterParams, { withCredentials: true });
  }

  approve(id: Guid){
    const url = this.requestUrl + "approve";
    return this.http.post(url, JSON.stringify(id), { withCredentials: true, headers: {'Content-Type': 'application/json' }});
  }

  decline(id: Guid){
    const url = this.requestUrl + "decline";
    return this.http.post(url, JSON.stringify(id), { withCredentials: true, headers: {'Content-Type': 'application/json' } });
  }
}
