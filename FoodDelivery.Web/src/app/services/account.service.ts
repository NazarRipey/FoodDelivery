import { UserAccount } from './../models/userProfile/UserAccount';
import { UpdateProfile } from './../models/userProfile/UpdateProfile';
import { UserListResponse } from './../models/userProfile/UserListResponse';
import { UserFilterParams } from './../models/filters/UserFilterParams';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from './../models/userProfile/UserProfile';
import { Observable } from 'rxjs';
import { serverUrl } from './../globals';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  authUrl = serverUrl + "api/account/";

  constructor(private http: HttpClient) { }

  public getUserAccount(id: string): Observable<UserAccount>{
    const url = this.authUrl + `user/${id}`;
    return this.http.get<UserAccount>(url, { withCredentials: true });
  }

  public retrieveOrderManagers(userFilterParams:UserFilterParams): Observable<UserListResponse>{
    const url = this.authUrl + "managers";
    return this.http.post<UserListResponse>(url, userFilterParams, { withCredentials: true });
  }

  public retrieveUsers(userFilterParams:UserFilterParams): Observable<UserListResponse>{
    const url = this.authUrl + "users";
    return this.http.post<UserListResponse>(url, userFilterParams, { withCredentials: true });
  }
  
  public activateAccount(email: string){
    const url = this.authUrl + "activate";
    return this.http.post(url, JSON.stringify(email), 
      { withCredentials: true, headers: {'Content-Type': 'application/json' } });
  }

  public deactivateAccount(email: string){
    const url = this.authUrl + "deactivate";
    return this.http.post(url, JSON.stringify(email), 
      { withCredentials: true, headers: {'Content-Type': 'application/json' } });
  }

  public updateProfile(updateProfile: UpdateProfile){
    const url = this.authUrl + "update";
    return this.http.put(url, updateProfile, { withCredentials: true });
  }
}
