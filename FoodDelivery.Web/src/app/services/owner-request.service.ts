import { roleRequestStatus } from './../models/enums/roleRequestStatus';
import { ownerRequest } from './../models/ownerRequest';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from './../app.module';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OwnerRequestService {

  requestUrl = serverUrl + "api/ownerrequest";
  
  constructor(private http:HttpClient) { }

  getRequests(status: string | null): Observable<ownerRequest[]> {
    let url = this.requestUrl;
    if(status){
      url += `?status=${status}`
    }
    
    return this.http.get<ownerRequest[]>(url, { withCredentials: true });
  }

  approve(ownerRequest: ownerRequest){
    const url = this.requestUrl + "/approve";
    return this.http.post<ownerRequest>(url, ownerRequest, { withCredentials: true });
  }

  deny(ownerRequest: ownerRequest){
    const url = this.requestUrl + "/deny";
    return this.http.post<ownerRequest>(url, ownerRequest, { withCredentials: true });
  }
}
