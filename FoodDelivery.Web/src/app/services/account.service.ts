import { IFileDetails } from './../models/IFileDetails';
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

  accountUrl = serverUrl + "api/account/";

  constructor(private http: HttpClient) { }

  public getUserProfile(): Observable<UserProfile>{
    const url = this.accountUrl + "user";
    return this.http.get<UserProfile>(url, { withCredentials: true });
  }

  public getUserAccount(id: string): Observable<UserAccount>{
    const url = this.accountUrl + `account/${id}`;
    return this.http.get<UserAccount>(url, { withCredentials: true });
  }

  public retrieveOrderManagers(userFilterParams:UserFilterParams): Observable<UserListResponse>{
    const url = this.accountUrl + "managers";
    return this.http.post<UserListResponse>(url, userFilterParams, { withCredentials: true });
  }

  public retrieveUsers(userFilterParams:UserFilterParams): Observable<UserListResponse>{
    const url = this.accountUrl + "users";
    return this.http.post<UserListResponse>(url, userFilterParams, { withCredentials: true });
  }
  
  public activateAccount(email: string){
    const url = this.accountUrl + "activate";
    return this.http.post(url, JSON.stringify(email), 
      { withCredentials: true, headers: {'Content-Type': 'application/json' } });
  }

  public deactivateAccount(email: string){
    const url = this.accountUrl + "deactivate";
    return this.http.post(url, JSON.stringify(email), 
      { withCredentials: true, headers: {'Content-Type': 'application/json' } });
  }

  public updateProfile(updateProfile: UpdateProfile){
    const url = this.accountUrl;
    return this.http.put(url, updateProfile, { withCredentials: true });
  }

  public getImage(id: string): Observable<string>{
    const url = this.accountUrl + `image/${id}`;
    const requestOptions: Object = {
      responseType: 'text',
      withCredentials: true
    }

    return this.http.get<string>(url,  requestOptions);
  }
  
  public changeImage(image: IFileDetails, id: string){
    const url = this.accountUrl + `changeimage/${id}`;
    return this.http.post(url, image, { withCredentials: true });
  }

  public deleteImage(id: string){
    const url = this.accountUrl + `deleteimage/${id}`;
    return this.http.delete(url, { withCredentials: true });
  }
}
