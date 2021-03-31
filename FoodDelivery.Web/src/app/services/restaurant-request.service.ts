import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { restaurantRequestFilterParams } from './../models/filters/restaurantRequestFilterParams';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from './../app.module';
import { Injectable } from '@angular/core';
import { restaurantRequestResponse } from '../models/restaurantRequest/restaurantRequestResponse';

@Injectable({
  providedIn: 'root'
})
export class RestaurantRequestService {

  requestUrl = serverUrl + "api/restaurantrequest/"

  constructor(private http: HttpClient) { }

  retrieve(filterParams: restaurantRequestFilterParams): Observable<restaurantRequestResponse>
  {
    const url = this.requestUrl + "retrieve";
    return this.http.post<restaurantRequestResponse>(url, filterParams, { withCredentials: true });
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
