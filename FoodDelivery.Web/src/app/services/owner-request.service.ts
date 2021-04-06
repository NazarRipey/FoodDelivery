import { OwnerRequestStatus } from '../models/enums/statuses/OwnerRequestStatus';
import { Guid } from 'guid-typescript';
import { OwnerRequestFilterParams } from '../models/filters/OwnerRequestFilterParams';
import { OwnerRequestResponse } from '../models/ownerRequest/OwnerRequestResponse';
import { OwnerRequest } from '../models/ownerRequest/OwnerRequest';
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

  getStatus(id: Guid): Observable<OwnerRequestStatus>{
    const url = this.requestUrl + `status?id=${id}`;
    return this.http.get<OwnerRequestStatus>(url);
  }

  retrieve(filterParams: OwnerRequestFilterParams): Observable<OwnerRequestResponse> {
    const url = this.requestUrl + "retrieve";
    return this.http.post<OwnerRequestResponse>(url, filterParams, { withCredentials: true });
  }

  approve(id: Guid){
    const url = this.requestUrl + "approve";
    return this.http.post<OwnerRequest>(url, JSON.stringify(id), { withCredentials: true, headers: {'Content-Type': 'application/json' }});
  }

  decline(id: Guid){
    const url = this.requestUrl + "decline";
    return this.http.post<OwnerRequest>(url, JSON.stringify(id), { withCredentials: true, headers: {'Content-Type': 'application/json' } });
  }
}
