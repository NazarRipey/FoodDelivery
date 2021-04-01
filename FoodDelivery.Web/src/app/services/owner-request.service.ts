import { ownerRequestStatus } from './../models/enums/statuses/ownerRequestStatus';
import { Guid } from 'guid-typescript';
import { ownerRequestFilterParams } from '../models/filters/ownerRequestFilterParams';
import { ownerRequestResponse } from './../models/ownerRequest/ownerRequestResponse';
import { ownerRequestObject } from '../models/ownerRequest/ownerRequestObject';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serverUrl } from './../globals';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OwnerRequestService {

  requestUrl = serverUrl + "api/ownerrequest/";
  
  constructor(private http:HttpClient) { }

  getStatus(id: Guid): Observable<ownerRequestStatus>{
    const url = this.requestUrl + `status?id=${id}`;
    return this.http.get<ownerRequestStatus>(url);
  }

  retrieve(filterParams: ownerRequestFilterParams): Observable<ownerRequestResponse> {
    const url = this.requestUrl + "retrieve";
    return this.http.post<ownerRequestResponse>(url, filterParams, { withCredentials: true });
  }

  approve(id: Guid){
    const url = this.requestUrl + "approve";
    return this.http.post<ownerRequestObject>(url, JSON.stringify(id), { withCredentials: true, headers: {'Content-Type': 'application/json' }});
  }

  decline(id: Guid){
    const url = this.requestUrl + "decline";
    return this.http.post<ownerRequestObject>(url, JSON.stringify(id), { withCredentials: true, headers: {'Content-Type': 'application/json' } });
  }
}
